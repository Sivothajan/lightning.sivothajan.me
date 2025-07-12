import dotenv from "dotenv";

dotenv.config();

export const apiKey = process.env.BINANCE_API_KEY;
export const apiSecret = process.env.BINANCE_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Binance API Key or Secret is missing!");
  process.exit(1);
}
