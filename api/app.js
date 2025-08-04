import express, { json } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

// Importing Binance-related functions
import checkPaymentStatus from "./binance/checkPaymentStatus.js";
import getDepositAddress from "./binance/getDepositAddress.js";

// Importing Supabase-related functions
import getDataFromDb from "./supabase/payRequest/getDataFromDb.js";
import getPaymentStatus from "./supabase/payRequest/getPaymentStatus.js";
import updatePaymentStatus from "./supabase/payRequest/updatePaymentStatus.js";

// Importing wallet-related functions
import saveDepositDetails from "./wallet/saveDepositDetails.js";

import dotenv from "dotenv";

dotenv.config({ quiet: true });

const hostName = process.env.HOST_NAME || "lightning.sivothajan.me";
const nostrPublicKey =
  process.env.NOSTR_PUBLIC_KEY ||
  "523dbfa6c2ed3a2a405bcac0ec26a1a27fdb597056a13d9360815903ead12b29";
const minSendable = parseInt(process.env.MIN_SENDABLE) || 1000;
const maxSendable = parseInt(process.env.MAX_SENDABLE) || 10000000000;
const isNameMandatory = process.env.IS_NAME_MANDATORY === "true";
const isEmailMandatory = process.env.IS_EMAIL_MANDATORY === "true";
const isPubkeyMandatory = process.env.IS_PUBKEY_MANDATORY === "true";
const allowsNostr = process.env.ALLOWS_NOSTR === "true";
const isEmailIdentifier = process.env.IS_EMAIL_IDENTIFIER === "true";
const isDisposableAddress = process.env.IS_DISPOSABLE_ADDRESS === "true";
const isCommentsAllowed = process.env.IS_COMMENTS_ALLOWED === "true";

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
      "/lnurlp/verify/:uuid":
        "GET - Verifies if the payment with the provided UUID has been settled.",
      "/.well-known/lnurlp/:username":
        "GET - Returns LNURLP information for the specified username. The username can include a tag for additional context.",
      "/.well-known/lnurlp/:username+tag":
        "GET - Returns LNURLP information for the specified username with a tag. The tag can be used for additional context.",
    },
    note: "Amounts must be provided in millisatoshis (1 satoshi = 1000 millisatoshis).",
  });
});

const timestamp = Date.now();

app.get("/lnurlp/callback", async (req, res) => {
  const { amount } = req.query;
  const { comment } = req.query;

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
      const uuid = uuidv4();
      try {
        await saveDepositDetails(uuid, data);
        await getPaymentStatus(uuid);
      } catch (error) {
        console.log("Error saving deposit details:", error);
      } finally {
        const content = {
          status: "OK",
          successAction: {
            // LUD-09
            tag: "message",
            message: "Thanks, sats received!",
          },
          verify: `https://${hostName}/lnurlp/verify/${uuid}`,
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

app.get("/check", (req, res) => {
  res.json({
    status: "OK",
    timestamp,
  });
});

app.get("/lnurlp/verify/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const rowData = await getDataFromDb(uuid);
    const pr = rowData[0]?.address;
    if (!uuid || !pr) {
      return res.json({
        status: "ERROR",
        reason: "Not found",
      });
    }

    const isPaidInDb = await getPaymentStatus(pr);
    const isPaidInBinance = await checkPaymentStatus(pr);

    if (isPaidInDb != isPaidInBinance) {
      await updatePaymentStatus(uuid, isPaidInBinance);
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
    commentAllowed: 255,
    callback: `https://${hostName}/lnurlp/callback`,
    minSendable: minSendable,
    maxSendable: maxSendable,
    payerData: {
      name: { mandatory: isNameMandatory },
      email: { mandatory: isEmailMandatory },
      pubkey: { mandatory: isPubkeyMandatory },
    },
    metadata: JSON.stringify(metadataArr),
  };

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
  console.log(`Server is running on port ${port}`);
});
