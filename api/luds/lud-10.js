/**
 * Creates a success action object with AES-encrypted data.
 *
 * @param {string} description - Description of the action, up to 144 characters.
 * @param {string} ciphertext - Base64-encoded AES-encrypted data (encryption key is payment preimage), up to 4096 characters (4kb).
 * @param {string} iv - Base64-encoded initialization vector, exactly 24 characters.
 * @returns {{tag: string, description: string, ciphertext: string, iv: string}} Success action object with tag, description, ciphertext, and iv.
 * @throws {Error} If any parameter does not meet the specified criteria:
 *   - description is not a string or exceeds 144 characters
 *   - ciphertext is not a string or exceeds 4096 characters (4kb)
 *   - iv is not a string or is not exactly 24 characters
 */
export const successAction_aes = (description, ciphertext, iv) => {
  if (
    typeof description !== "string" ||
    typeof ciphertext !== "string" ||
    typeof iv !== "string"
  ) {
    throw new Error("Description, ciphertext, and IV must be strings");
  }
  if (description.length > 144) {
    throw new Error("Description must be up to 144 characters");
  }
  if (ciphertext.length > 4096) {
    throw new Error(
      "Ciphertext must be base64-encoded and up to 4096 characters/4kb",
    );
  }
  if (iv.length !== 24) {
    throw new Error("IV must be base64-encoded and exactly 24 characters");
  }
  return {
    tag: "aes",
    description,
    ciphertext,
    iv,
  };
};

import crypto from "crypto";

/**
 * AES-CBC encrypt
 * @param {Buffer} preimage - 32-byte key
 * @param {string} message - UTF-8 string to encrypt
 * @returns {[chiphertext: string, iv: string]} Array of [ciphertext_base64, iv_base64]
 * @throws {Error} If any parameter does not meet the specified criteria:
 *   - preimage is not a Buffer or is not 32 bytes long
 *   - message is not a string or is empty
 */
export const aes_encrypt = (preimage, message) => {
  if (!Buffer.isBuffer(preimage) || preimage.length !== 32) {
    throw new Error("AES key must be 32 bytes long");
  }
  if (!message || typeof message !== "string") {
    throw new Error("Message must not be empty");
  }
  const iv = crypto.randomBytes(16);
  // PKCS#7 padding
  const pad = 16 - (Buffer.byteLength(message, "utf8") % 16);
  const padded = Buffer.concat([
    Buffer.from(message, "utf8"),
    Buffer.alloc(pad, pad),
  ]);
  const cipher = crypto.createCipheriv("aes-256-cbc", preimage, iv);
  const ciphertext = Buffer.concat([cipher.update(padded), cipher.final()]);
  return [ciphertext.toString("base64"), iv.toString("base64")];
};

/**
 * AES-CBC decrypt
 * @param {Buffer} preimage - 32-byte key
 * @param {string} ciphertext_base64
 * @param {string} iv_base64
 * @returns {string} Decrypted UTF-8 string
 * @throws {Error} If any parameter does not meet the specified criteria:
 *   - preimage is not a Buffer or is not 32 bytes long
 *   - iv_base64 is not a base64 string or is not 16 bytes long when decoded
 *   - ciphertext_base64 is not a base64 string or is not a multiple of 16 bytes when decoded
 *   - decryption fails due to bad padding
 */
export const aes_decrypt = (preimage, ciphertext_base64, iv_base64) => {
  if (!Buffer.isBuffer(preimage) || preimage.length !== 32) {
    throw new Error("AES key must be 32 bytes long");
  }
  const iv = Buffer.from(iv_base64, "base64");
  if (iv.length !== 16) {
    throw new Error("IV must be 16 bytes long");
  }
  const ciphertext = Buffer.from(ciphertext_base64, "base64");
  if (ciphertext.length % 16 !== 0) {
    throw new Error("Ciphertext must be a multiple of 16 bytes long");
  }
  const decipher = crypto.createDecipheriv("aes-256-cbc", preimage, iv);
  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);
  // Remove PKCS#7 padding
  const pad = decrypted[decrypted.length - 1];
  if (pad < 1 || pad > 16) {
    throw new Error("Decryption failed (bad padding)");
  }
  for (let i = 1; i <= pad; i++) {
    if (decrypted[decrypted.length - i] !== pad) {
      throw new Error("Decryption failed (bad padding)");
    }
  }
  const unpadded = decrypted.slice(0, decrypted.length - pad);
  return unpadded.toString("utf8");
};
