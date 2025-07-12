import { supabase, supabaseTable } from "./supabaseClient.js";

const addDataToDb = async (uuid, paymentData) => {
  const { data, error } = await supabase.from(supabaseTable).insert([
    {
      uuid: uuid,
      data: paymentData,
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully!");
    console.log(data);
  }
};

export default addDataToDb;
