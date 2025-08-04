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

const checkPaymentStatus = async (lnbcAddress) => {
  const params = {
    includeSource: true,
    coin: coin,
    timestamp: Date.now(),
  };

  const queryString = new URLSearchParams(params).toString();
  const signature = createHmac("sha256", apiSecret)
    .update(queryString)
    .digest("hex");
  const url = `https://api.binance.com/sapi/v1/capital/withdraw/history?${queryString}&signature=${signature}`;

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

      if (filteredData[0].status === 6 && filteredData.length === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("Error: Unexpected response format", data);
      return false;
    }
  } catch (error) {
    console.error("Error fetching deposit details:", error);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
};

export default checkPaymentStatus;
