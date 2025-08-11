import { createClient } from "@supabase/supabase-js";
import { decodeBolt11Invoice } from "../utils/index.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

/**
 * @constant {string} supabaseUrl - The URL of the Supabase instance
 * @type {string}
 */
const supabaseUrl = process.env.SUPABASE_URL;

/**
 * @constant {string} supabasePublicAnonKey - The public anonymous key for Supabase
 * @type {string}
 * @description This key is used to authenticate requests to the Supabase instance.
 * Make sure to set the environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.
 */
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * @const {string} supabasePayRequestTable - The name of the Supabase Pay Request table to use
 * @type {string}
 * @description This table is used to store pay request details for the wallet.
 * It should be defined in your Supabase project.
 * Make sure to set the environment variable SUPABASE_PAY_REQUEST_TABLE in your .env file.
 */
export const supabasePayRequestTable = process.env.SUPABASE_PAY_REQUEST_TABLE;

/**
 * @const {string} supabaseWithdrawRequestTable - The name of the Supabase Withdraw Request table to use
 * @type {string}
 * @description This table is used to store withdraw request details for the wallet.
 * It should be defined in your Supabase project.
 * Make sure to set the environment variable SUPABASE_WITHDRAW_REQUEST_TABLE in your .env file.
 */
export const supabaseWithdrawRequestTable =
  process.env.SUPABASE_WITHDRAW_REQUEST_TABLE;

/** * Creates a Supabase client instance
 * @returns {object} The Supabase client
 */
export const supabase = createClient(supabaseUrl, supabasePublicAnonKey);

if (!supabaseUrl || !supabasePublicAnonKey) {
  console.error("Supabase URL or Public Anon Key is missing!");
  process.exit(1);
}

// Withdraw Request Related

/**
 * @function checkWithdrawRequestStatus
 * @description Fetches the withdraw status from the Supabase database using a unique identifier.
 * @param {string} k1 - The unique identifier for the withdraw request.
 * @returns {Promise<boolean>} A promise that resolves to the withdraw status (is_paid).
 */
export const checkWithdrawRequestStatus = async (k1) => {
  const { boolValue, error } = await supabase
    .from(supabaseWithdrawRequestTable)
    .select("is_paid")
    .eq("k1", k1);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data fetched successfully!");
    return boolValue;
  }
};

/**
 * @function getWithdrawRequestData
 * @description Fetches withdraw data from the Supabase database using a unique identifier.
 * @param {string} k1 - The unique identifier for the withdraw request.
 * @returns {Promise<object[]>} A promise that resolves to an array of withdraw data objects.
 */
export const getWithdrawRequestData = async (k1) => {
  const { data, error } = await supabase
    .from(supabaseWithdrawRequestTable)
    .select("*")
    .eq("k1", k1);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data fetched successfully!");
    return data;
  }
};

/**
 * @function saveWithdrawRequestData
 * @description Inserts decoded withdraw invoice data into Supabase.
 * @param {string} k1 - Unique identifier for the withdraw request.
 * @param {string} pr - BOLT11 invoice string (payment request).
 */
export const saveWithdrawRequestData = async (k1, pr) => {
  const decodedInvoice = decodeBolt11Invoice(pr);

  if (!decodedInvoice || !decodedInvoice.paymentRequest) {
    console.error("Invalid invoice (pr). Decoding failed.");
    return;
  }

  const amountMsat =
    Number(decodedInvoice.millisatoshis) ||
    Number(decodedInvoice.satoshis) * 1000 ||
    0;

  const withdrawData = {
    address: decodedInvoice.paymentRequest,
    coin: "BTC", // You need to set this manually or detect it elsewhere
    amount: amountMsat,
    network: decodedInvoice.network?.bech32 || null,
    prefix: decodedInvoice.prefix || null,
    payee_node: decodedInvoice.payeeNodeKey || null,
    payment_hash:
      decodedInvoice.tags.find((t) => t.tagName === "payment_hash")?.data ||
      null,
    expires_at: decodedInvoice.timeExpireDateString || null,
  };

  if (!withdrawData.address || !withdrawData.amount || !withdrawData.coin) {
    console.error("Missing required fields:", withdrawData);
    return;
  }
  const url = `https://lightningdecoder.com/${withdrawData.address}`;

  const { data, error } = await supabase
    .from(supabaseWithdrawRequestTable)
    .insert([
      {
        k1: k1,
        address: withdrawData.address,
        url: url,
        coin: withdrawData.coin,
        amount: withdrawData.amount,
        network: withdrawData.network,
        prefix: withdrawData.prefix,
        payee_node: withdrawData.payee_node,
        payment_hash: withdrawData.payment_hash,
        expires_at: withdrawData.expires_at,
        is_paid: false,
      },
    ]);

  if (error) {
    console.error("Error inserting into Supabase:", error);
  } else {
    console.log("Withdraw request saved successfully:", data);
  }
};

/**
 * @function updateWithdrawStatus
 * @description Updates the withdraw status in the Supabase database using a unique identifier.
 * @param {string} k1 - The unique identifier for the withdraw request.
 * @param {boolean} is_paid - The new withdraw status to be set.
 * @returns {Promise<boolean>} A promise that resolves to true if the update was successful, false otherwise.
 */
export const updateWithdrawStatus = async (k1, is_paid) => {
  const { boolValue, error } = await supabase
    .from(supabaseWithdrawRequestTable)
    .update({ is_paid: is_paid })
    .eq("k1", k1)
    .select();

  if (error) {
    console.error("Error fetching data:", error);
    return false;
  } else {
    console.log(boolValue);
    console.log("Data fetched successfully!");
    return true;
  }
};

// Payment Request Related

/**
 * @function checkPayRequestStatus
 * @description Fetches the payment status from the Supabase database using a unique identifier.
 * @param {string} uuid - The unique identifier for the payment request.
 * @returns {Promise<boolean>} A promise that resolves to the payment status (is_paid).
 */
export const checkPayRequestStatus = async (uuid) => {
  const { boolValue, error } = await supabase
    .from(supabasePayRequestTable)
    .select("is_paid")
    .eq("uuid", uuid);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data fetched successfully!");
    return boolValue;
  }
};

/**
 * @function getPayRequestData
 * @description Fetches payment data from the Supabase database using a unique identifier.
 * @param {string} uuid - The unique identifier for the payment request.
 * @returns {Promise<object[]>} A promise that resolves to an array of payment data objects.
 */
export const getPayRequestData = async (uuid) => {
  const { data, error } = await supabase
    .from(supabasePayRequestTable)
    .select("*")
    .eq("uuid", uuid);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data fetched successfully!");
    return data;
  }
};

/**
 * @function savePayRequestData
 * @description Inserts payment data into the Supabase database.
 * @param {string} uuid - The unique identifier for the payment request.
 * @param {object} paymentData - The payment data to be inserted.
 * @param {string} paymentData.address - The address associated with the payment.
 * @param {string} [paymentData.url] - Optional URL for additional information.
 * @param {string} paymentData.coin - The type of coin used for the payment.
 * @param {number} paymentData.amount - The amount of the payment.
 * @param {string} [paymentData.nostr_pubkey] - Optional Nostr public key.
 * @param {string} [paymentData.tag] - Optional tag for the payment.
 * @param {string} [paymentData.comment] - Optional comment for the payment.
 */
export const savePayRequestData = async (uuid, paymentData) => {
  const { data, error } = await supabase.from(supabasePayRequestTable).insert([
    {
      uuid: uuid,
      address: paymentData.address,
      url: paymentData.url || null,
      coin: paymentData.coin,
      amount: paymentData.amount,
      nostr_pubkey: paymentData.nostr_pubkey || null,
      tag: paymentData.tag || null,
      comment: paymentData.comment || null,
      is_paid: false,
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully!");
    console.log(data);
  }
};

/**
 * @function updatePayRequestStatus
 * @description Updates the payment status in the Supabase database using a unique identifier.
 * @param {string} uuid - The unique identifier for the payment request.
 * @param {boolean} is_paid - The new payment status to be set.
 * @returns {Promise<boolean>} A promise that resolves to true if the update was successful, false otherwise.
 */
export const updatePayRequestStatus = async (uuid, is_paid) => {
  const { boolValue, error } = await supabase
    .from(supabasePayRequestTable)
    .update({ is_paid: is_paid })
    .eq("uuid", uuid)
    .select();

  if (error) {
    console.error("Error fetching data:", error);
    return false;
  } else {
    console.log(boolValue);
    console.log("Data fetched successfully!");
    return true;
  }
};
