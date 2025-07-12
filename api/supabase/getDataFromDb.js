import { supabase, supabaseTable } from "./supabaseClient.js";

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
