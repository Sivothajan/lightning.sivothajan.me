import addDataToDb from "../supabase/payRequest/addDataToDb.js";

const saveDepositDetails = async (uuid, data) => {
  if (data) {
    console.log(data);
    addDataToDb(uuid, data);
    console.log("Deposit details saved to database");
  } else {
    console.log("No deposit details found");
  }
};

export default saveDepositDetails;
