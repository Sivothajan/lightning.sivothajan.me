import { supabase, supabasePayRequestTable } from "../supabaseClient.js";

/**
 * @function getPayRequestData
 * @description Fetches payment data from the Supabase database using a unique identifier.
 * @param {string} uuid - The unique identifier for the payment request.
 * @returns {Promise<object[]>} A promise that resolves to an array of payment data objects.
 */
const getPayRequestData = async (uuid) => {
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

export default getPayRequestData;
