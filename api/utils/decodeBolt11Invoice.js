import bolt11 from "bolt11";

export const decodeBolt11Invoice = (str) => {
  try {
    return bolt11.decode(str);
  } catch (err) {
    console.error("Error decoding Bolt11 invoice:", err);
  }
};
