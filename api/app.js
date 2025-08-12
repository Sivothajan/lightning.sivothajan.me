export const config = {
  runtime: "edge",
};

import {
  getDepositAddress,
  checkPaymentStatus,
  checkWithdrawStatus,
} from "./binance.js";
import {
  savePayRequestData,
  getPayRequestData,
  checkPayRequestStatus,
  updatePayRequestStatus,
  saveWithdrawRequestData,
  getWithdrawRequestData,
  checkWithdrawRequestStatus,
  updateWithdrawStatus,
} from "./supabase.js";

const decodeBolt11Invoice = async (str) => {
  try {
    const decoded = await fetch(`/bolt11/decode/${str}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return decoded.json();
  } catch (err) {
    console.error("Error decoding Bolt11 invoice:", err);
  }
};

const generateK1 = () => {
  return crypto.randomBytes(32).toString("hex"); // 32 bytes → 64 hex chars
};

/**
 * Validates a k1 challenge string - lud-07
 * @param {string} k1 - Second-level hex encoded secret byte array
 * @returns {{isValid: boolean, reason?: string}} Validation result
 */
const validateK1 = (k1) => {
  try {
    if (typeof k1 !== "string" || !k1.trim()) {
      return {
        isValid: false,
        reason: "k1 must be a non-empty string",
      };
    }

    // k1 should be hex encoded
    if (!/^[0-9a-fA-F]+$/.test(k1)) {
      return {
        isValid: false,
        reason: "k1 must be hex encoded",
      };
    }

    if (k1.length !== 64) {
      return {
        isValid: false,
        reason: "k1 must be 32 bytes hex encoded (64 hex characters)",
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      reason: `k1 validation error: ${error.message}`,
    };
  }
};

/**
 * Generates a UUID (Universally Unique Identifier).
 * This function uses the `uuid` library to create a version 4 UUID.
 */
const generateUUID = () => crypto.randomUUID();

const isBolt11Invoice = async (str) => {
  try {
    const decoded = await fetch(`/bolt11/decode/${str}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return decoded.complete === true;
  } catch (err) {
    return false;
  }
};

/**
 * @constant {string} hostName - The hostname for the application
 * @type {string}
 * @description This is used to construct URLs and should be set in your .env file.
 */
const hostName = process.env.HOST_NAME || "lightning.sivothajan.me";

/**
 * @constant {string} nostrPublicKey - The public key for Nostr integration
 * @type {string}
 * @description This key is used for Nostr-related functionalities and should be set in your .env file.
 */
const nostrPublicKey =
  process.env.NOSTR_PUBLIC_KEY ||
  "523dbfa6c2ed3a2a405bcac0ec26a1a27fdb597056a13d9360815903ead12b29";

/**
 * @constant {number} minSendable - The minimum amount that can be sent in millisatoshis
 * @type {number}
 * @description This value is used to validate the minimum sendable amount and should be set in your .env file.
 */
const minSendable = parseInt(process.env.MIN_SENDABLE) || 1000;

/**
 * @constant {number} maxSendable - The maximum amount that can be sent in millisatoshis
 * @type {number}
 * @description This value is used to validate the maximum sendable amount and should be set in your .env file.
 */
const maxSendable = parseInt(process.env.MAX_SENDABLE) || 10000000000;

/**
 * @constant {number} minWithdrawable - The minimum amount that can be withdrawable in millisatoshis
 * @type {number}
 * @description This value is used to validate the minimum withdrawable amount and should be set in your .env file.
 */
const minWithdrawable = parseInt(process.env.MIN_WITHDRAWABLE) || 1000;

/**
 * @constant {number} maxWithdrawable - The maximum amount that can be withdrawable in millisatoshis
 * @type {number}
 * @description This value is used to validate the maximum withdrawable amount and should be set in your .env file.
 */
const maxWithdrawable = parseInt(process.env.MAX_WITHDRAWABLE) || 10000000000;

/**
 * @constant {boolean} isNameMandatory - Whether the name field is mandatory
 * @type {boolean}
 * @description This flag indicates if the name field is required in requests.
 */
const isNameMandatory = process.env.IS_NAME_MANDATORY === "true";

/**
 * @constant {boolean} isEmailMandatory - Whether the email field is mandatory
 * @type {boolean}
 * @description This flag indicates if the email field is required in requests.
 */
const isEmailMandatory = process.env.IS_EMAIL_MANDATORY === "true";

/**
 * @constant {boolean} isPubkeyMandatory - Whether the public key field is mandatory
 * @type {boolean}
 * @description This flag indicates if the public key field is required in requests.
 */
const isPubkeyMandatory = process.env.IS_PUBKEY_MANDATORY === "true";

/**
 * @constant {boolean} allowsNostr - Whether Nostr integration is allowed
 * @type {boolean}
 * @description This flag indicates if Nostr-related functionalities are enabled.
 */
const allowsNostr = process.env.ALLOWS_NOSTR === "true";

/**
 * @constant {boolean} isEmailIdentifier - Whether email is used as an identifier
 * @type {boolean}
 * @description This flag indicates if the email field is used as a unique identifier in requests.
 */
const isEmailIdentifier = process.env.IS_EMAIL_IDENTIFIER === "true";

/**
 * @constant {boolean} isDisposableAddress - Whether disposable lnurlp addresses are allowed
 * @type {boolean}
 * @description This flag indicates if disposable lnurlp addresses are permitted in requests.
 */
const isDisposableAddress = process.env.IS_DISPOSABLE_ADDRESS === "true";

/**
 * @constant {boolean} isCommentsAllowed - Whether comments are allowed in requests
 * @type {boolean}
 * @description This flag indicates if comments are permitted in requests.
 */
const isCommentsAllowed = process.env.IS_COMMENTS_ALLOWED === "true";

/**
 * @constant {boolean} isMessageInSuccessAction - Whether a message is included in the success action
 * @type {boolean}
 * @description This flag indicates if a message should be included in the success action response.
 */
const isMessageInSuccessAction =
  process.env.IS_MESSAGE_IN_SUCCESS_ACTION === "true";

if (!hostName || !nostrPublicKey) {
  console.error("Host name or Nostr public key is missing!");
  process.exit(1);
}

if (isNaN(minSendable) || isNaN(maxSendable)) {
  console.error("Min or Max sendable amounts are not valid numbers!");
  process.exit(1);
}

if (minSendable <= 0 || maxSendable <= 0) {
  console.error("Min or Max sendable amounts must be greater than zero!");
  process.exit(1);
}

if (minSendable >= maxSendable) {
  console.error("Min sendable amount must be less than Max sendable amount!");
  process.exit(1);
}

if (isNaN(minWithdrawable) || isNaN(maxWithdrawable)) {
  console.error("Min or Max withdrawable amounts are not valid numbers!");
  process.exit(1);
}

if (minWithdrawable <= 0 || maxWithdrawable <= 0) {
  console.error("Min or Max withdrawable amounts must be greater than zero!");
  process.exit(1);
}

if (minWithdrawable >= maxWithdrawable) {
  console.error(
    "Min withdrawable amount must be less than Max withdrawable amount!",
  );
  process.exit(1);
}

const allowedOrigins = [
  "https://sivothajan.me",
  "http://sivothajan.me",
  "https://sivothajan.dev",
  "https://sivothajan.is-a.dev",
  // "http://localhost:3000",  // For local development
  // "http://localhost:5173"   // For Vite development server
];

const baseCorsHeaders = {
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

export default async function handler(request) {
  const origin = request.headers["origin"] || "";

  // Create headers with proper CORS origin
  const headers = new Headers({
    ...baseCorsHeaders,
    "Content-Type": "application/json",
    "X-Robots-Tag": "noindex, nofollow",
    "X-Title": "Sivothayan's Lightning API",
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
      ? origin
      : "",
  });

  headers.append("Link", '/favicon.ico; rel="icon"');
  headers.append(
    "Link",
    '/favicon/apple-touch-icon.png; rel="apple-touch-icon" sizes="180x180"',
  );
  headers.append(
    "Link",
    '/favicon/favicon-32x32.webp; rel="icon" type="image/webp" sizes="32x32"',
  );
  headers.append(
    "Link",
    '/favicon/favicon-16x16.webp; rel="icon" type="image/webp" sizes="16x16"',
  );
  headers.append("Link", '/favicon/site.webmanifest; rel="manifest"');

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }
  try {
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase();

    if (pathname === "/api/forbidden") {
      return new Response(
        JSON.stringify({
          error: "Forbidden",
          message: "You are not allowed to access this resource.",
        }),
        {
          status: 403,
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        },
      );
    }

    if (pathname === "/") {
      return new Response(
        JSON.stringify({
          status: "OK",
          message: "Welcome to the Lightning Payment API",
          description:
            "This API handles Lightning Network payment requests and verification via Binance.",
          available_endpoints: {
            "/": "GET - Shows this welcome message with available endpoints.",
            "/check": "GET - Returns server status and timestamp.",
            "/lnurlp/callback/pay?amount=[amount_in_msats]":
              "GET - Initiates a deposit request and returns a payment request (pr). Amount is required in millisatoshis.",
            "/lnurlp/callback/pay?amount=[amount_in_msats]&comment=[string]":
              "GET - Initiates a deposit request with an optional comment and returns a payment request (pr). Amount is required in millisatoshis.",
            "/lnurlp/service/pay/verify/:uuid":
              "GET - Verifies if the payment with the provided UUID has been settled.",
            "/.well-known/lnurlp/:username":
              "GET - Returns LNURLP information for the specified username. The username can include a tag for additional context.",
            "/.well-known/lnurlp/:username+tag":
              "GET - Returns LNURLP information for the specified username with a tag. The tag can be used for additional context.",
            "/lnurlp/service/withdraw":
              "GET - Initiates a withdraw request service.",
            "/lnurlp/callback/withdraw?k1=[k1]&pr=[payment_request_address]":
              "GET - Processes a withdraw request with the provided k1 and payment request address (pr).",
            "/lnurlp/service/withdraw/verify/:k1":
              "GET - Verifies the withdraw request with the provided k1.",
          },
          note: "Amounts must be provided in millisatoshis (1 satoshi = 1000 millisatoshis).",
        }),
        {
          status: 200,
          headers,
        },
      );
    }

    if (request.method === "GET") {
      if (pathname === "/check") {
        const timestamp = Date.now();
        return new Response(
          JSON.stringify({
            status: "OK",
            timestamp,
          }),
          {
            status: 500,
            headers,
          },
        );
      }

      if (pathname.startsWith("/lnurlp/callback/pay")) {
        const amount = url.searchParams.get("amount");
        const comment = url.searchParams.get("comment");

        const amountInt = parseInt(amount);
        if (!amountInt || isNaN(amountInt)) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Amount is required.",
            }),
          );
        }

        if (amountInt < minSendable || amountInt > maxSendable) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: `Amount must be between ${minSendable} and ${maxSendable} millisatoshis.`,
            }),
          );
        }

        if (isCommentsAllowed && comment && comment.length > 255) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Comment is too long. Maximum length is 255 characters.",
            }),
          );
        }

        if (!isCommentsAllowed && comment) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Comments are not allowed.",
            }),
          );
        }

        try {
          const [payreqAddress, data] = await getDepositAddress(amountInt);
          data.comment = comment || null;
          data.amount = amountInt;
          data.nostr_pubkey = nostrPublicKey;
          data.is_paid = false;

          if (!payreqAddress) {
            console.log("Error fetching deposit address!");
            return new Response(
              JSON.stringify({
                status: "ERROR",
                reason: "Error fetching deposit address",
              }),
              {
                status: 500,
                headers,
              },
            );
          }

          console.log("Deposit address fetched successfully:", payreqAddress);

          if (payreqAddress != null) {
            const uuid = generateUUID();
            try {
              await savePayRequestData(uuid, data);
              await getPayRequestData(uuid);

              let successAction;
              isMessageInSuccessAction
                ? (successAction = {
                    tag: "message",
                    message: "Thanks, sats received!",
                  })
                : (successAction = {
                    tag: "url",
                    description: "Thanks for your sats, Verify your payment",
                    url: `https://${hostName}/lnurlp/service/pay/verify/${uuid}`,
                  });
              const content = {
                status: "OK",
                successAction: successAction, // LUD-09
                verify: `https://${hostName}/lnurlp/service/pay/verify/${uuid}`,
                routes: [],
                pr: `${payreqAddress}`,
                disposable: isDisposableAddress, // LUD-11
                commentAllowed: 0, // LUD-12
              };
              if (isCommentsAllowed) {
                content.commentAllowed = 255; // Allow comments if configured
              }
              return new Response(JSON.stringify(content));
            } catch (error) {
              console.error("Error saving pay request data:", error);
              return new Response(
                JSON.stringify({
                  status: "ERROR",
                  reason:
                    "Internal server error while processing payment request.",
                }),
                {
                  status: 500,
                  headers,
                },
              );
            }
          } else {
            console.log("Error fetching deposit address!");
            console.log("Amount:", amountInt);
            return new Response(
              JSON.stringify({
                status: "ERROR",
                reason: "Error fetching deposit address",
              }),
              {
                status: 500,
                headers,
              },
            );
          }
        } catch (error) {
          console.log("Error fetching deposit address:", error);
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Error fetching deposit address",
            }),
            {
              status: 500,
              headers,
            },
          );
        }
      }

      if (pathname.startsWith("/lnurlp/service/pay/verify/")) {
        const { uuid } = pathname.split("/lnurlp/service/pay/verify/")[1] || {};
        if (!uuid) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "UUID is required.",
            }),
            {
              status: 400,
              headers,
            },
          );
        }
        try {
          const rowData = await getPayRequestData(uuid);
          const pr = rowData[0]?.address;
          if (!uuid || !pr) {
            return new Response(
              JSON.stringify({
                status: "ERROR",
                reason: "Not found",
              }),
              {
                status: 404,
                headers,
              },
            );
          }

          const isPaidInDb = await checkPayRequestStatus(uuid);
          const isPaidInBinance = await checkPaymentStatus(pr);

          if (isPaidInDb != isPaidInBinance) {
            await updatePayRequestStatus(uuid, isPaidInBinance);
            return new Response(
              JSON.stringify({
                status: "OK",
                settled: isPaidInBinance,
                preimage: null,
                pr: pr,
              }),
              {
                status: 200,
                headers,
              },
            );
          }

          return new Response(
            JSON.stringify({
              status: "OK",
              settled: isPaidInDb,
              preimage: null,
              pr: pr,
            }),
            {
              status: 200,
              headers,
            },
          );
        } catch (error) {
          console.log("Error fetching data:", error);
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Not found",
            }),
            {
              status: 404,
              headers,
            },
          );
        }
      }

      if (pathname.startsWith("/lnurlp/service/withdraw")) {
        const k1 = generateK1();
        try {
          return new Response(
            JSON.stringify({
              tag: "withdrawRequest",
              callback: `https://${hostName}/lnurlp/callback/withdraw`,
              k1: k1,
              defaultDescription: `Withdraw sats from ${hostName} for the k1: ${k1}`,
              minWithdrawable: minWithdrawable,
              maxWithdrawable: maxWithdrawable,
            }),
            {
              status: 200,
              headers,
            },
          );
        } catch (error) {
          console.error("Error saving withdraw request data:", error);
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason:
                "Internal server error while processing withdraw request.",
            }),
            {
              status: 500,
              headers,
            },
          );
        }
      }

      if (pathname.startsWith("/lnurlp/callback/withdraw")) {
        const k1 = url.searchParams.get("k1");
        const pr = url.searchParams.get("pr");
        if (!k1 || !pr) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Invalid request. Please provide a valid k1 and pr.",
            }),
            {
              status: 400,
              headers,
            },
          );
        }
        const isBolt11InvoiceOkay = await isBolt11Invoice(pr);
        if (!isBolt11InvoiceOkay) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Invalid pr. Please check your request.",
            }),
            {
              status: 400,
              headers,
            },
          );
        }
        if (!validateK1(k1)) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Invalid k1. Please check your request.",
            }),
            {
              status: 400,
              headers,
            },
          );
        }
        const decodedInvoice = await decodeBolt11Invoice(pr);
        if (!decodedInvoice) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Invalid pr. Please check your request.",
            }),
            {
              status: 400,
              headers,
            },
          );
        }
        const amount =
          decodedInvoice.millisatoshis || 1000 * decodedInvoice.satoshis || 0;
        if (amount < minWithdrawable || amount > maxWithdrawable) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: `Amount must be between ${minWithdrawable} and ${maxWithdrawable} millisatoshis.`,
            }),
            {
              status: 400,
              headers,
            },
          );
        }
        try {
          await saveWithdrawRequestData(k1, pr);
          await getWithdrawRequestData(k1);
          return new Response(
            JSON.stringify({
              status: "OK",
              message:
                "Withdraw request saved successfully & will be paid out soon once the payment is verified.",
            }),
            {
              status: 200,
              headers,
            },
          );
        } catch (error) {
          console.error("Error saving withdraw request data:", error);
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason:
                "Internal server error while processing withdraw request.",
            }),
            {
              status: 500,
              headers,
            },
          );
        }
      }

      if (pathname.startsWith("/lnurlp/service/withdraw/verify")) {
        const { k1 } = url.searchParams.get("k1");
        if (!k1) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "K1 is required.",
            }),
            {
              status: 400,
              headers,
            },
          );
        }
        try {
          const rowData = await getWithdrawRequestData(k1);
          if (rowData.length === 0) {
            return new Response(
              JSON.stringify({
                status: "ERROR",
                reason: "Withdraw request not found.",
              }),
              {
                status: 404,
                headers,
              },
            );
          }
          const wr = rowData[0]?.address;
          if (!wr) {
            return new Response(
              JSON.stringify({
                status: "ERROR",
                reason: "Withdraw request not found.",
              }),
              {
                status: 404,
                headers,
              },
            );
          }
          const isPaidInDb = await checkWithdrawRequestStatus(k1);
          const pr = await getWithdrawRequestData(k1);
          const isPaidInBinance = await checkWithdrawStatus(pr);

          if (isPaidInDb != isPaidInBinance) {
            await updateWithdrawStatus(k1, isPaidInBinance);
            return new Response(
              JSON.stringify({
                status: "OK",
                settled: isPaidInBinance,
                preimage: null,
                pr: wr,
              }),
              {
                status: 200,
                headers,
              },
            );
          }

          return new Response(
            JSON.stringify({
              status: "OK",
              settled: isPaidInDb,
              preimage: null,
              pr: pr,
            }),
            {
              status: 200,
              headers,
            },
          );
        } catch (error) {
          console.log("Error fetching data:", error);
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Withdraw request not found.",
            }),
            {
              status: 404,
              headers,
            },
          );
        }
      }

      if (pathname.startsWith("/.well-known/lnurlp/")) {
        const username = pathname.split("/.well-known/lnurlp/")[1];
        if (!username) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Username is required.",
            }),
            {
              status: 400,
              headers,
            },
          );
        }
        let serviceUsername = username;
        let tag = null;

        const identifierText = isEmailIdentifier
          ? "text/email"
          : "text/identifier";

        if (!username || username.length === 0) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Username is required.",
            }),
            {
              status: 400,
              headers,
            },
          );
        }

        if (username.length > 64) {
          return new Response(
            JSON.stringify({
              status: "ERROR",
              reason: "Username is too long. Maximum length is 64 characters.",
            }),
            {
              status: 400,
              headers,
            },
          );
        }

        let plainText;
        if (username.includes("+")) {
          [serviceUsername, tag] = username.split("+");
          if (isEmailIdentifier) {
            plainText = `Sats for email: ${serviceUsername}@${hostName} with tag: ${tag}`;
          } else {
            plainText = `Sats for identifier: ${serviceUsername} with tag: ${tag}`;
          }
        } else if (isEmailIdentifier) {
          plainText = `Sats for email: ${serviceUsername}@${hostName}`;
        } else {
          plainText = `Sats for identifier: ${serviceUsername}`;
        }

        let metadataArr = [
          [identifierText, `${serviceUsername}@${hostName}`],
          ["text/plain", plainText],
        ];
        if (tag) {
          metadataArr.push(["text/tag", tag]);
        }

        let content = {
          status: "OK",
          tag: "payRequest",
          commentAllowed: 0,
          callback: `https://${hostName}/lnurlp/callback/pay`,
          minSendable: minSendable,
          maxSendable: maxSendable,
          payerData: {
            name: { mandatory: isNameMandatory },
            email: { mandatory: isEmailMandatory },
            pubkey: { mandatory: isPubkeyMandatory },
          },
          metadata: JSON.stringify(metadataArr),
        };

        if (isCommentsAllowed) {
          content.commentAllowed = 255;
        }

        if (allowsNostr) {
          content.nostr_pubkey = nostrPublicKey;
          content.allowsNostr = allowsNostr;
        }

        new Response(JSON.stringify(content));
      }
    }

    return new Response(
      JSON.stringify({
        status: "ERROR",
        reason: "Endpoint not found.",
      }),
      {
        status: 404,
        headers,
      },
    );
  } catch (error) {
    console.error("Error in API handler:", error);
    return new Response(
      JSON.stringify({
        status: "ERROR",
        reason: "Internal server error",
      }),
      {
        status: 500,
        headers,
      },
    );
  }
}
