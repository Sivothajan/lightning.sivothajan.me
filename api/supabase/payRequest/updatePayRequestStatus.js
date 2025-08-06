import { supabase, supabasePayRequestTable } from "../supabaseClient.js";

/**
 * @function updatePayRequestStatus
 * @description Updates the payment status in the Supabase database using a unique identifier.
 * @param {string} uuid - The unique identifier for the payment request.
 * @param {boolean} is_paid - The new payment status to be set.
 * @returns {Promise<boolean>} A promise that resolves to true if the update was successful, false otherwise.
 */
const updatePayRequestStatus = async (uuid, is_paid) => {
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

export default updatePayRequestStatus;
