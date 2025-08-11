import express, { json } from "express";
import cors from "cors";

import {
  savePayRequestData,
  getPayRequestData,
  checkPayRequestStatus,
  updatePayRequestStatus,
  saveWithdrawRequestData,
  getWithdrawRequestData,
  checkWithdrawRequestStatus,
  updateWithdrawStatus,
} from "./supabase/index.js";

import {
  generateK1,
  isBolt11Invoice,
  decodeBolt11Invoice,
  generateUUID,
} from "./utils/index.js";

import {
  getDepositAddress,
  checkPaymentStatus,
  checkWithdrawStatus,
} from "./binance/index.js";

import * as luds from "./luds/index.js";

import dotenv from "dotenv";

dotenv.config({ quiet: true });

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

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

app.use(json());

app.get("/", (req, res) => {
  res.json({
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
      "/lnurlp/service/withdraw": "GET - Initiates a withdraw request service.",
      "/lnurlp/callback/withdraw?k1=[k1]&pr=[payment_request_address]":
        "GET - Processes a withdraw request with the provided k1 and payment request address (pr).",
      "/lnurlp/service/withdraw/verify/:k1":
        "GET - Verifies the withdraw request with the provided k1.",
    },
    note: "Amounts must be provided in millisatoshis (1 satoshi = 1000 millisatoshis).",
  });
});

app.get("/lnurlp/callback/pay", async (req, res) => {
  const { amount, comment } = req.query;

  const amountInt = parseInt(amount);
  if (!amountInt || isNaN(amountInt)) {
    return res.json({
      status: "ERROR",
      reason: "Amount is required.",
    });
  }

  if (amountInt < minSendable || amountInt > maxSendable) {
    return res.json({
      status: "ERROR",
      reason: `Amount must be between ${minSendable} and ${maxSendable} millisatoshis.`,
    });
  }

  if (isCommentsAllowed && comment && comment.length > 255) {
    return res.json({
      status: "ERROR",
      reason: "Comment is too long. Maximum length is 255 characters.",
    });
  }

  if (!isCommentsAllowed && comment) {
    return res.json({
      status: "ERROR",
      reason: "Comments are not allowed.",
    });
  }

  try {
    const [payreqAddress, data] = await getDepositAddress(amountInt);
    data.comment = comment || null;
    data.amount = amountInt;
    data.nostr_pubkey = nostrPublicKey;
    data.is_paid = false;

    if (!payreqAddress) {
      console.log("Error fetching deposit address!");
      return res.json({
        status: "ERROR",
        reason: "Error fetching deposit address",
      });
    }

    console.log("Deposit address fetched successfully:", payreqAddress);

    if (payreqAddress != null) {
      const uuid = generateUUID();
      try {
        await savePayRequestData(uuid, data);
        await getPayRequestData(uuid);
      } catch (error) {
        console.log("Error saving deposit details:", error);
      } finally {
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
        return res.json(content);
      }
    } else {
      console.log("Error fetching deposit address!");
      console.log("Amount:", amountInt);
      return res.json({
        status: "ERROR",
        reason: "Error fetching deposit address",
      });
    }
  } catch (error) {
    console.log("Error fetching deposit address:", error);
    return res.json({
      status: "ERROR",
      reason: "Error fetching deposit address",
    });
  }
});

app.get("/lnurlp/service/withdraw", async (req, res) => {
  const k1 = generateK1();
  try {
    res.json({
      tag: "withdrawRequest",
      callback: `https://${hostName}/lnurlp/callback/withdraw`,
      k1: k1,
      defaultDescription: `Withdraw sats from ${hostName} for the k1: ${k1}`,
      minWithdrawable: minWithdrawable,
      maxWithdrawable: maxWithdrawable,
    });
  } catch (error) {
    console.error("Error saving withdraw request data:", error);
    res.status(500).json({
      status: "ERROR",
      reason: "Internal server error while processing withdraw request.",
    });
  }
});

app.get("/lnurlp/callback/withdraw", async (req, res) => {
  const { k1, pr } = req.query;
  if (!k1 || !pr) {
    return res.status(400).json({
      status: "ERROR",
      reason: "Invalid request. Please provide a valid k1 and pr.",
    });
  }
  if (!isBolt11Invoice(pr)) {
    return res.status(400).json({
      status: "ERROR",
      reason: "Invalid pr. Please check your request.",
    });
  }
  if (!luds.validateK1(k1)) {
    return res.status(400).json({
      status: "ERROR",
      reason: "Invalid k1. Please check your request.",
    });
  }
  const decodedInvoice = decodeBolt11Invoice(pr);
  if (!decodedInvoice) {
    return res.status(400).json({
      status: "ERROR",
      reason: "Invalid pr. Please check your request.",
    });
  }
  const amount =
    decodedInvoice.millisatoshis || 1000 * decodedInvoice.satoshis || 0;
  if (amount < minWithdrawable || amount > maxWithdrawable) {
    return res.status(400).json({
      status: "ERROR",
      reason: `Amount must be between ${minWithdrawable} and ${maxWithdrawable} millisatoshis.`,
    });
  }
  try {
    await saveWithdrawRequestData(k1, pr);
    await getWithdrawRequestData(k1);
    res.json({
      status: "OK",
      message:
        "Withdraw request saved successfully & will be paid out soon once the payment is verified.",
    });
  } catch (error) {
    console.error("Error saving withdraw request data:", error);
    res.status(500).json({
      status: "ERROR",
      reason: "Internal server error while processing withdraw request.",
    });
  }
});

app.get("/lnurlp/service/withdraw/verify/:k1", async (req, res) => {
  const { k1 } = req.params;
  if (!k1) {
    return res.status(400).json({
      status: "ERROR",
      reason: "K1 is required.",
    });
  }
  try {
    const rowData = await getWithdrawRequestData(k1);
    if (rowData.length === 0) {
      return res.json({
        status: "ERROR",
        reason: "Withdraw request not found.",
      });
    }
    const wr = rowData[0]?.address;
    if (!wr) {
      return res.json({
        status: "ERROR",
        reason: "Withdraw request not found.",
      });
    }
    const isPaidInDb = await checkWithdrawRequestStatus(k1);
    const pr = await getWithdrawRequestData(k1);
    const isPaidInBinance = await checkWithdrawStatus(pr);

    if (isPaidInDb != isPaidInBinance) {
      await updateWithdrawStatus(k1, isPaidInBinance);
      return res.json({
        status: "OK",
        settled: isPaidInBinance,
        preimage: null,
        pr: wr,
      });
    }

    return res.json({
      status: "OK",
      settled: isPaidInDb,
      preimage: null,
      pr: pr,
    });
  } catch (error) {
    console.log("Error fetching data:", error);
    return res.json({
      status: "ERROR",
      reason: "Withdraw request not found.",
    });
  }
});

app.get("/check", (req, res) => {
  const timestamp = Date.now();
  res.json({
    status: "OK",
    timestamp,
  });
});

app.get("/lnurlp/service/pay/verify/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const rowData = await getPayRequestData(uuid);
    const pr = rowData[0]?.address;
    if (!uuid || !pr) {
      return res.json({
        status: "ERROR",
        reason: "Not found",
      });
    }

    const isPaidInDb = await checkPayRequestStatus(uuid);
    const isPaidInBinance = await checkPaymentStatus(pr);

    if (isPaidInDb != isPaidInBinance) {
      await updatePayRequestStatus(uuid, isPaidInBinance);
      return res.json({
        status: "OK",
        settled: isPaidInBinance,
        preimage: null,
        pr: pr,
      });
    }

    return res.json({
      status: "OK",
      settled: isPaidInDb,
      preimage: null,
      pr: pr,
    });
  } catch (error) {
    console.log("Error fetching data:", error);
    return res.json({
      status: "ERROR",
      reason: "Not found",
    });
  }
});

app.get("/.well-known/lnurlp/:username", (req, res) => {
  const { username } = req.params;
  let serviceUsername = username;
  let tag = null;

  const identifierText = isEmailIdentifier ? "text/email" : "text/identifier";

  if (!username || username.length === 0) {
    return res.status(400).json({
      status: "ERROR",
      reason: "Username is required.",
    });
  }

  if (username.length > 64) {
    return res.status(400).json({
      status: "ERROR",
      reason: "Username is too long. Maximum length is 64 characters.",
    });
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

  res.json(content);
});

app.all("/{*splat}", (req, res) => {
  res.status(404).json({
    status: "ERROR",
    reason: "Endpoint not found.",
  });
});

export default app;

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("\x1b[33m%s\x1b[0m", `⚡ Server launched on port ${port}`);
  console.log(
    "\x1b[35m%s\x1b[0m",
    `🌐 Dev Server URL: http://${host || "localhost"}:${port}`,
  );
});
