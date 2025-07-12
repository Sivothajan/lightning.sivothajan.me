import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Binance API Key or Binance Secret is missing!");
  process.exit(1);
}

export default { apiKey, apiSecret };
