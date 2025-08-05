import { supabase, supabaseTable } from "../supabaseClient.js";

/**
 * @function addDataToDb
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
const addDataToDb = async (uuid, paymentData) => {
  const { data, error } = await supabase.from(supabaseTable).insert([
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

export default addDataToDb;
