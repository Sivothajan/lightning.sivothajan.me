import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const apiKey = process.env.BINANCE_API_KEY;
export const apiSecret = process.env.BINANCE_API_SECRET;

export const coin = process.env.COIN || "BTC";
export const network = process.env.NETWORK || "LIGHTNING";

if (!apiKey || !apiSecret) {
  console.error("Binance API Key or Secret is missing!");
  process.exit(1);
}

if (!coin || !network) {
  console.error("Coin type or network is not defined!");
  process.exit(1);
}
