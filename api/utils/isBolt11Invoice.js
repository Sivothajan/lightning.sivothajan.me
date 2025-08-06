import bolt11 from "bolt11";

export const isBolt11Invoice = (str) => {
  try {
    const decoded = bolt11.decode(str);
    return decoded.complete === true;
  } catch (err) {
    return false;
  }
};
