import dotenv from "dotenv";

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
