import fetch from "node-fetch";
import { createHmac } from "crypto";
import AbortController from "abort-controller";
import { apiKey, apiSecret, coin, network } from "./binanceClient.js";

if (!apiKey || !apiSecret) {
  console.error("API Key or Secret is missing!");
  process.exit(1);
}

if (!coin || !network) {
  console.error("Coin type or network is not defined!");
  process.exit(1);
}

/** * Round the amount to a valid range for Binance deposit address request
 * @param {number} amount - The amount in milli-satoshis
 * @returns {number} The rounded amount in Bitcoin
 */
const amountRounder = (amount) => {
  const satoshisToBitcoin = (sats) => sats * 0.00000001;
  const bitcoinToSatoshis = (btc) => btc * 100000000;
  const bitcoinToMilliSatoshis = (btc) => btc * 100000000000;

  const minBitcoinAmount = 0.00002;
  const maxBitcoinAmount = 0.01;

  const minMSatsAmount = bitcoinToMilliSatoshis(minBitcoinAmount);
  const maxMSatsAmount = bitcoinToMilliSatoshis(maxBitcoinAmount);

  const minStatsAmount = bitcoinToSatoshis(minBitcoinAmount);
  const maxStatsAmount = bitcoinToSatoshis(maxBitcoinAmount);

  let newAmount = satoshisToBitcoin(minStatsAmount);

  if (amount >= minMSatsAmount && amount <= maxMSatsAmount && amount !== 0) {
    newAmount = satoshisToBitcoin(amount * 1000);
  } else if (amount < minMSatsAmount) {
    newAmount = satoshisToBitcoin(minStatsAmount);
  } else if (amount > maxMSatsAmount) {
    newAmount = satoshisToBitcoin(maxStatsAmount);
  }

  return newAmount;
};

/** * Fetches the deposit address from Binance API
 * @param {number} amount - The amount in milli-satoshis
 * @returns {Promise<Array<string, object> | null>} Returns an array with address and additional data or null on error
 */
const getDepositAddress = async (amount) => {
  const newAmount = amountRounder(amount);
  const params = {
    coin: coin,
    network: network,
    amount: newAmount,
    timestamp: Date.now(),
  };

  const queryString = new URLSearchParams(params).toString();
  const signature = createHmac("sha256", apiSecret)
    .update(queryString)
    .digest("hex");
  const url = `https://api.binance.com/sapi/v1/capital/deposit/address?${queryString}&signature=${signature}`;

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

    if (data && data.address) {
      console.log("Deposit Address:", data.address);
      console.log("URL:", data.url);
      console.log("Coin:", data.coin);
      console.log("Tag:", data.tag);
      return [data.address, data];
    } else {
      console.log("Error:", data);
    }
  } catch (error) {
    console.error("Error fetching deposit address:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

export default getDepositAddress;
