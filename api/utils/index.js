import bolt11 from "bolt11";
import { randomBytes } from "crypto";
import { v4 } from "uuid";

export const decodeBolt11Invoice = (str) => {
  try {
    return bolt11.decode(str);
  } catch (err) {
    console.error("Error decoding Bolt11 invoice:", err);
  }
};

export const generateK1 = () => {
  return randomBytes(32).toString("hex"); // 32 bytes → 64 hex chars
};

/**
 * Generates a UUID (Universally Unique Identifier).
 * This function uses the `uuid` library to create a version 4 UUID.
 */
export const generateUUID = () => v4();

export const isBolt11Invoice = (str) => {
  try {
    const decoded = bolt11.decode(str);
    return decoded.complete === true;
  } catch (err) {
    return false;
  }
};
