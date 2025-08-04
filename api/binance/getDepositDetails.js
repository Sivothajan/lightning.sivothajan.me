import fetch from "node-fetch";
import { createHmac } from "crypto";
import AbortController from "abort-controller";
import { apiKey, apiSecret, coin } from "./binanceClient.js";

if (!apiKey || !apiSecret) {
  console.error("API Key or Secret is missing!");
  process.exit(1);
}

if (!coin) {
  console.error("Coin type is not defined!");
  process.exit(1);
}

const getDepositDetails = async (lnbcAddress) => {
  const params = {
    includeSource: true,
    coin: coin,
    timestamp: Date.now(),
  };

  const queryString = new URLSearchParams(params).toString();
  const signature = createHmac("sha256", apiSecret)
    .update(queryString)
    .digest("hex");
  const url = `https://api.binance.com/sapi/v1/capital/deposit/hisrec?${queryString}&signature=${signature}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "X-MBX-APIKEY": apiKey },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching data: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      const filteredData = data.filter(
        (deposit) => deposit.address === lnbcAddress,
      );
      return filteredData;
    } else {
      console.log("Error: Unexpected response format", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching deposit details:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

export default getDepositDetails;
