import { supabase, supabaseTable } from "../supabaseClient.js";

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
