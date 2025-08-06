import { supabase, supabaseWithdrawRequestTable } from "../supabaseClient.js";

/**
 * @function getWithdrawRequestData
 * @description Fetches withdraw data from the Supabase database using a unique identifier.
 * @param {string} k1 - The unique identifier for the withdraw request.
 * @returns {Promise<object[]>} A promise that resolves to an array of withdraw data objects.
 */
const getWithdrawRequestData = async (k1) => {
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

export default getWithdrawRequestData;
