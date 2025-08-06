import { randomBytes } from "crypto";

export const generateK1 = () => {
  return randomBytes(32).toString("hex"); // 32 bytes → 64 hex chars
};
