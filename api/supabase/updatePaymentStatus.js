import { supabase, supabaseTable } from "./supabaseClient.js";

const updatePaymetStatus = async (uuid, isPaid) => {
  const { boolValue, error } = await supabase
    .from(supabaseTable)
    .update({ isPaid: isPaid })
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

export default updatePaymetStatus;
