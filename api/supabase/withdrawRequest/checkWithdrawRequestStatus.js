import { supabase, supabaseWithdrawRequestTable } from "../supabaseClient.js";

/**
 * @function checkWithdrawRequestStatus
 * @description Fetches the withdraw status from the Supabase database using a unique identifier.
 * @param {string} k1 - The unique identifier for the withdraw request.
 * @returns {Promise<boolean>} A promise that resolves to the withdraw status (is_paid).
 */
const checkWithdrawRequestStatus = async (k1) => {
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

export default checkWithdrawRequestStatus;
