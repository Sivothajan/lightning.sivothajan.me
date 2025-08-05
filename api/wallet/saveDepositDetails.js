import addDataToDb from "../supabase/payRequest/addDataToDb.js";

/**
 * Saves deposit details to the database
 * @param {string} uuid - The unique identifier for the deposit
 * @param {Array<object>} data - The deposit details to save
 * @returns {Promise<void>} Null
 */
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
