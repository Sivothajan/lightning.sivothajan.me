import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import getDepositAddress from "./binance/getDepositAddress.js";
import { v4 as uuidv4 } from "uuid";
import saveDepositDetails from "./wallet/saveDepositDetails.js";
import getDataFromDb from "./supabase/getDataFromDb.js";
import getPaymentStatus from "./supabase/getPaymentStatus.js";
import updatePaymentStatus from "./supabase/updatePaymentStatus.js";
import checkPaymentStatus from "./binance/checkPaymentStatus.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
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
      "/lnurlp/callback?amount=<amount_in_msats>":
        "GET - Initiates a deposit request and returns a payment request (pr). Amount is required in millisatoshis.",
      "/lnurlp/verify/:uuid":
        "GET - Verifies if the payment with the provided UUID has been settled.",
    },
    note: "Amounts must be provided in millisatoshis (1 satoshi = 1000 millisatoshis).",
  });
});

const coin = "BTC";
const network = "LIGHTNING";
const timestamp = Date.now();

app.get("/lnurlp/callback", async (req, res) => {
  const { amount } = req.query;

  if (!amount) {
    return res.json({
      status: "ERROR",
      reason: "Amount is required.",
    });
  }

  try {
    const [payreqAddress, data] = await getDepositAddress(amount);

    if (payreqAddress != null) {
      const uuid = uuidv4();
      try {
        await saveDepositDetails(uuid, data);
        await getPaymentStatus(uuid);
      } catch (error) {
        console.log("Error saving deposit details:", error);
      } finally {
        return res.json({
          status: "OK",
          successAction: {
            tag: "message",
            message: "Thanks, sats received!",
          },
          verify: `https://lightning.sivothajan.me/lnurlp/verify/${uuid}`,
          routes: [],
          pr: `${payreqAddress}`,
        });
      }
    } else {
      console.log("Error fetching deposit address!");
      console.log("Amount:", amount);
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
    const pr = rowData[0]?.data?.address;
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

    if (!uuid && !pr) {
      return res.json({
        status: "ERROR",
        reason: "Not found",
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
  }

  return res.json({
    status: "ERROR",
    reason: "Not found",
  });
});

app.options("/(.*)/", cors());

export default app;
