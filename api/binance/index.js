import dotenv from "dotenv";
import fetch from "node-fetch";
import { createHmac } from "crypto";
import AbortController from "abort-controller";

dotenv.config({ quiet: true });

/**
 * @constant {string} apiKey - The Binance API key retrieved from environment variables
 * @type {string}
 */
export const apiKey = process.env.BINANCE_API_KEY;

/**
 * @constant {string} apiSecret - The Binance API decret retrieved from environment variables
 * @type {string}
 */
export const apiSecret = process.env.BINANCE_API_SECRET;

/**
 * @constant {string} coin - The coin type retrieved from environment variables
 * @type {string}
 */
export const coin = process.env.COIN || "BTC";

/**
 * @constant {string} network - The network type retrieved from environment variables
 * @type {string}
 */
export const network = process.env.NETWORK || "LIGHTNING";

if (!apiKey || !apiSecret) {
  console.error("Binance API Key or Secret is missing!");
  process.exit(1);
}

if (!coin || !network) {
  console.error("Coin type or network is not defined!");
  process.exit(1);
}

// Withdraw Request Related

/** * Checks the withdraw status for a given Lightning address.
 * @param {string} lnbcAddress - The Lightning address to check.
 * @return {Promise<boolean>} Returns true if the withdraw is confirmed, false otherwise.
 */
export const checkWithdrawStatus = async (lnbcAddress) => {
  const params = {
    includeSource: true,
    coin: coin,
    timestamp: Date.now(),
  };

  const queryString = new URLSearchParams(params).toString();
  const signature = createHmac("sha256", apiSecret)
    .update(queryString)
    .digest("hex");
  const url = `https://api.binance.com/sapi/v1/capital/sapi/v1/capital/deposit/hisrec?${queryString}&signature=${signature}`;

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

/**
 * Fetches the payment details from Binance API
 * @param {string} lnbcAddress - The LNURL address to fetch payment details for
 * @returns {Promise<Array<object> | null>} Returns an array of payment details or null on error
 */
export const getPaymentDetails = async (lnbcAddress) => {
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
        (payment) => payment.address === lnbcAddress,
      );
      return filteredData;
    } else {
      console.log("Error: Unexpected response format", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching payment details:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

// Payment Request Related

/** * Checks the payment status for a given Lightning address.
 * @param {string} lnbcAddress - The Lightning address to check.
 * @return {Promise<boolean>} Returns true if the payment is confirmed, false otherwise.
 */
export const checkPaymentStatus = async (lnbcAddress) => {
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
        (withdraw) => withdraw.address === lnbcAddress,
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
    console.error("Error fetching withdraw details:", error);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
};

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
export const getDepositAddress = async (amount) => {
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

/**
 * Fetches the deposit details from Binance API
 * @param {string} lnbcAddress - The LNURL address to fetch deposit details for
 * @returns {Promise<Array<object> | null>} Returns an array of deposit details or null on error
 */
export const getDepositDetails = async (lnbcAddress) => {
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
