import { supabase, supabaseTable } from "../supabaseClient.js";

/**
 * @function getPaymetStatus
 * @description Fetches the payment status from the Supabase database using a unique identifier.
 * @param {string} uuid - The unique identifier for the payment request.
 * @returns {Promise<boolean>} A promise that resolves to the payment status (is_paid).
 */
const getPaymetStatus = async (uuid) => {
  const { boolValue, error } = await supabase
    .from(supabaseTable)
    .select("is_paid")
    .eq("uuid", uuid);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data fetched successfully!");
    return boolValue;
  }
};

export default getPaymetStatus;
