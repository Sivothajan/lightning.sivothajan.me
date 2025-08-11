import express, { json } from "express";
import cors from "cors";

import {
  getDepositAddress,
  checkPaymentStatus,
} from "./binance/payRequest/index.js";
import { checkWithdrawStatus } from "./binance/withdrawRequest/index.js";
import {
  savePayRequestData,
  getPayRequestData,
  checkPayRequestStatus,
  updatePayRequestStatus,
} from "./supabase/payRequest/index.js";
import {
  saveWithdrawRequestData,
  getWithdrawRequestData,
  checkWithdrawRequestStatus,
  updateWithdrawStatus,
} from "./supabase/withdrawRequest/index.js";
import * as luds from "./luds/index.js";
import {
  hostName,
  nostrPublicKey,
  minSendable,
  maxSendable,
  minWithdrawable,
  maxWithdrawable,
  isNameMandatory,
  isEmailMandatory,
  isPubkeyMandatory,
  allowsNostr,
  isEmailIdentifier,
  isDisposableAddress,
  isCommentsAllowed,
  isMessageInSuccessAction,
} from "./appClient.js";
import {
  generateK1,
  isBolt11Invoice,
  decodeBolt11Invoice,
  generateUUID,
} from "./utils/index.js";

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
      "/lnurlp/callback?amount=[amount_in_msats]":
        "GET - Initiates a deposit request and returns a payment request (pr). Amount is required in millisatoshis.",
      "/lnurlp/callback?amount=[amount_in_msats]&comment=[string]":
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
    const isPaidInBinance = await checkWithdrawStatus(k1);

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

    const isPaidInDb = await checkPayRequestStatus(pr);
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
