import { supabase, supabaseWithdrawRequestTable } from "../supabaseClient.js";
import { decodeBolt11Invoice } from "../../utils/index.js";

/**
 * @function saveWithdrawRequestData
 * @description Inserts decoded withdraw invoice data into Supabase.
 * @param {string} k1 - Unique identifier for the withdraw request.
 * @param {string} pr - BOLT11 invoice string (payment request).
 */
const saveWithdrawRequestData = async (k1, pr) => {
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

export default saveWithdrawRequestData;
