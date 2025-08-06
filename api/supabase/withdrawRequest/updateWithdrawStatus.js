import { supabase, supabaseWithdrawRequestTable } from "../supabaseClient.js";

/**
 * @function updateWithdrawStatus
 * @description Updates the withdraw status in the Supabase database using a unique identifier.
 * @param {string} k1 - The unique identifier for the withdraw request.
 * @param {boolean} is_paid - The new withdraw status to be set.
 * @returns {Promise<boolean>} A promise that resolves to true if the update was successful, false otherwise.
 */
const updateWithdrawStatus = async (k1, is_paid) => {
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

export default updateWithdrawStatus;
