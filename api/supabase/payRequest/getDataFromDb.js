import { supabase, supabaseTable } from "../supabaseClient.js";

/**
 * @function getDataFromDb
 * @description Fetches payment data from the Supabase database using a unique identifier.
 * @param {string} uuid - The unique identifier for the payment request.
 * @returns {Promise<object[]>} A promise that resolves to an array of payment data objects.
 */
const getDataFromDb = async (uuid) => {
  const { data, error } = await supabase
    .from(supabaseTable)
    .select("*")
    .eq("uuid", uuid);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data fetched successfully!");
    return data;
  }
};

export default getDataFromDb;
