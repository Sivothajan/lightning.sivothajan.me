import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { createHmac } from 'crypto';
import AbortController from 'abort-controller';

dotenv.config();

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('API Key or Secret is missing!');
  process.exit(1);
}

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

  if(amount >= minMSatsAmount && amount <= maxMSatsAmount && amount !== 0) {
    newAmount = satoshisToBitcoin(amount * 1000);
  } else if (amount < minMSatsAmount) {
    newAmount = satoshisToBitcoin(minStatsAmount);
  } else if (amount > maxMSatsAmount) {
    newAmount = satoshisToBitcoin(maxStatsAmount);
  }

  return newAmount;
};

const getDepositAddress = async (amount) => {
  const newAmount = amountRounder(amount);
  const params = {
    coin: "BTC",
    network: "LIGHTNING",
    amount: newAmount,
    timestamp: Date.now(),
  };

  const queryString = new URLSearchParams(params).toString();
  const signature = createHmac('sha256', apiSecret).update(queryString).digest('hex');
  const url = `https://api.binance.com/sapi/v1/capital/deposit/address?${queryString}&signature=${signature}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'X-MBX-APIKEY': apiKey },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.address) {
      console.log('Deposit Address:', data.address);
      console.log('URL:', data.url);
      console.log('Coin:', data.coin);
      console.log('Tag:', data.tag);
      return [data.address, data];
    } else {
      console.log('Error:', data);
    }
  } catch (error) {
    console.error('Error fetching deposit address:', error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

export default getDepositAddress;
