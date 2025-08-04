import { supabase, supabaseTable } from "../supabaseClient.js";

const addDataToDb = async (uuid, paymentData) => {
  const { data, error } = await supabase.from(supabaseTable).insert([
    {
      uuid: uuid,
      address: paymentData.address,
      url: paymentData.url || null,
      coin: paymentData.coin,
      amount: paymentData.amount,
      nostrPubkey: paymentData.nostr_pubkey || null,
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
