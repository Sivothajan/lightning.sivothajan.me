import { createHash, createHmac } from "crypto";

/**
 * Implementation of LUD-13: signMessage-based seed generation for auth protocol
 * @see https://github.com/lnurl/luds/blob/luds/13.md
 *
 * This spec defines a secure method for deriving LNURL-auth seeds using
 * the signMessage API provided by Lightning node implementations.
 */

/**
 * Canonical phrase that must NEVER be signed directly with private keys
 * @constant {string}
 */
export const CANONICAL_PHRASE =
  "DO NOT EVER SIGN THIS TEXT WITH YOUR PRIVATE KEYS! " +
  "IT IS ONLY USED FOR DERIVATION OF LNURL-AUTH HASHING-KEY, " +
  "DISCLOSING ITS SIGNATURE WILL COMPROMISE YOUR LNURL-AUTH IDENTITY " +
  "AND MAY LEAD TO LOSS OF FUNDS!";

/**
 * Converts a UTF-8 string to bytes
 * @param {string} str - String to convert
 * @returns {Buffer} UTF-8 encoded bytes
 */
const utf8ToBytes = (str) => Buffer.from(str, "utf8");

/**
 * Calculates SHA256 hash of input
 * @param {Buffer} data - Data to hash
 * @returns {Buffer} SHA256 hash
 */
const sha256 = (data) => createHash("sha256").update(data).digest();

/**
 * Calculates HMAC-SHA256 of message using key
 * @param {Buffer} key - Key for HMAC
 * @param {Buffer|string} message - Message to authenticate
 * @returns {Buffer} HMAC-SHA256 digest
 */
const hmacSha256 = (key, message) =>
  createHmac("sha256", key).update(message).digest();

/**
 * Derives the hashing key from a deterministic signature
 * @param {Buffer} signature - RFC6979 deterministic signature of canonical phrase hash
 * @returns {Buffer} Derived hashing key
 * @throws {Error} If signature is invalid
 */
export const deriveHashingKey = (signature) => {
  if (!Buffer.isBuffer(signature)) {
    throw new Error("Signature must be a Buffer");
  }

  if (signature.length === 0) {
    throw new Error("Signature cannot be empty");
  }

  return sha256(signature);
};

/**
 * Derives a domain-specific linking private key
 * @param {Buffer} hashingKey - The hashing key derived from the signature
 * @param {string} domain - Service domain name
 * @returns {Buffer} Domain-specific linking private key
 * @throws {Error} If inputs are invalid
 */
export const deriveLinkingKey = (hashingKey, domain) => {
  if (!Buffer.isBuffer(hashingKey)) {
    throw new Error("Hashing key must be a Buffer");
  }

  if (typeof domain !== "string" || !domain.trim()) {
    throw new Error("Domain must be a non-empty string");
  }

  // Extract domain from URL if a full URL was provided
  try {
    const url = new URL(
      domain.startsWith("http") ? domain : `https://${domain}`,
    );
    domain = url.hostname;
  } catch (error) {
    throw new Error("Invalid domain format");
  }

  return hmacSha256(hashingKey, domain);
};

/**
 * Gets the message to be signed for hashing key derivation
 * @returns {{message: string, hash: Buffer}} Message and its hash
 */
export const getSigningMessage = () => {
  const messageBytes = utf8ToBytes(CANONICAL_PHRASE);
  return {
    message: CANONICAL_PHRASE,
    hash: sha256(messageBytes),
  };
};

/**
 * Complete linking key derivation process
 * @param {Buffer} signature - RFC6979 deterministic signature of canonical phrase
 * @param {string} domain - Service domain name
 * @returns {{hashingKey: Buffer, linkingKey: Buffer}} Derived keys
 * @throws {Error} If inputs are invalid
 */
export const deriveKeys = (signature, domain) => {
  const hashingKey = deriveHashingKey(signature);
  const linkingKey = deriveLinkingKey(hashingKey, domain);

  return {
    hashingKey,
    linkingKey,
  };
};

/**
 * Validates that a signature matches the canonical phrase format
 * @param {Buffer} signature - Signature to validate
 * @returns {boolean} True if signature appears valid
 * @throws {Error} If signature is invalid
 */
export const validateSignature = (signature) => {
  if (!Buffer.isBuffer(signature)) {
    throw new Error("Signature must be a Buffer");
  }

  // Note: This is a basic format check
  // A real implementation would verify the ECDSA signature
  if (signature.length !== 64 && signature.length !== 65) {
    throw new Error("Invalid signature length");
  }

  return true;
};

/**
 * Creates a success response
 * @returns {{status: string}}
 */
export const createSuccessResponse = () => ({
  status: "OK",
});

/**
 * Creates an error response
 * @param {string} reason - Error reason
 * @returns {{status: string, reason: string}}
 */
export const createErrorResponse = (reason) => ({
  status: "ERROR",
  reason,
});

export default {
  deriveHashingKey,
  deriveLinkingKey,
  getSigningMessage,
  deriveKeys,
  validateSignature,
  createSuccessResponse,
  createErrorResponse,
};
