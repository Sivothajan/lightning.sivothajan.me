import { createHash } from "crypto";

/**
 * Implementation of LUD-18: Payer identity in payRequest
 * @see https://github.com/lnurl/luds/blob/luds/18.md
 *
 * This spec adds support for payer identification in LNURL-pay,
 * with cryptographic proof of payment through descriptionHash.
 */

/**
 * Valid payer data field types
 * @readonly
 * @enum {string}
 */
export const PayerDataField = {
  NAME: "name",
  PUBKEY: "pubkey",
  IDENTIFIER: "identifier",
  EMAIL: "email",
  AUTH: "auth",
};

/**
 * Creates a payerData request object
 * @param {Object} options - Requested payer data fields and their requirements
 * @param {boolean} [options.name] - Request name field
 * @param {boolean} [options.pubkey] - Request public key
 * @param {boolean} [options.identifier] - Request internet identifier
 * @param {boolean} [options.email] - Request email address
 * @param {Object} [options.auth] - Request auth data with k1 challenge
 * @returns {Object} PayerData request object
 */
export const createPayerDataRequest = (options = {}) => {
  const payerData = {};

  // Add requested fields
  if (options.name !== undefined) {
    payerData.name = { mandatory: !!options.name };
  }
  if (options.pubkey !== undefined) {
    payerData.pubkey = { mandatory: !!options.pubkey };
  }
  if (options.identifier !== undefined) {
    payerData.identifier = { mandatory: !!options.identifier };
  }
  if (options.email !== undefined) {
    payerData.email = { mandatory: !!options.email };
  }
  if (options.auth) {
    if (!options.auth.k1 || typeof options.auth.k1 !== "string") {
      throw new Error("Auth requires a k1 challenge value");
    }
    payerData.auth = {
      mandatory: !!options.auth.mandatory,
      k1: options.auth.k1,
    };
  }

  return payerData;
};

/**
 * Creates a payer data response object
 * @param {Object} data - Payer identification data
 * @returns {Object} Payer data response
 * @throws {Error} If data format is invalid
 */
export const createPayerData = (data) => {
  const response = {};

  // Add provided fields with validation
  if (data.name !== undefined) {
    if (typeof data.name !== "string") {
      throw new Error("Name must be a string");
    }
    response.name = data.name;
  }

  if (data.pubkey !== undefined) {
    if (!isValidHexString(data.pubkey)) {
      throw new Error("Public key must be a hex string");
    }
    response.pubkey = data.pubkey;
  }

  if (data.identifier !== undefined) {
    if (typeof data.identifier !== "string") {
      throw new Error("Identifier must be a string");
    }
    response.identifier = data.identifier;
  }

  if (data.email !== undefined) {
    if (typeof data.email !== "string") {
      throw new Error("Email must be a string");
    }
    response.email = data.email;
  }

  if (data.auth !== undefined) {
    if (!data.auth.key || !data.auth.k1 || !data.auth.sig) {
      throw new Error("Auth requires key, k1, and sig fields");
    }
    if (
      !isValidHexString(data.auth.key) ||
      !isValidHexString(data.auth.k1) ||
      !isValidHexString(data.auth.sig)
    ) {
      throw new Error("Auth fields must be hex strings");
    }
    response.auth = data.auth;
  }

  return response;
};

/**
 * Validates payer data against requirements
 * @param {Object} payerData - Provided payer data
 * @param {Object} requirements - Required fields from payerData request
 * @returns {boolean} True if data meets requirements
 * @throws {Error} If requirements are not met
 */
export const validatePayerData = (payerData, requirements) => {
  if (!payerData || !requirements) {
    throw new Error("Both payer data and requirements must be provided");
  }

  // Check mandatory fields
  for (const [field, requirement] of Object.entries(requirements)) {
    if (requirement.mandatory && !(field in payerData)) {
      throw new Error(`Missing mandatory field: ${field}`);
    }
  }

  // Check that provided fields were requested
  for (const field of Object.keys(payerData)) {
    if (!(field in requirements)) {
      throw new Error(`Unrequested field provided: ${field}`);
    }
  }

  return true;
};

/**
 * Calculates metadata hash including payer data
 * @param {string} metadata - Original service metadata JSON string
 * @param {Object} payerData - Payer identification data
 * @returns {Buffer} SHA256 hash of metadata with payer data
 * @throws {Error} If inputs are invalid
 */
export const calculateMetadataHash = (metadata, payerData) => {
  if (typeof metadata !== "string") {
    throw new Error("Metadata must be a string");
  }

  if (!payerData || typeof payerData !== "object") {
    throw new Error("Payer data must be an object");
  }

  try {
    // Validate metadata JSON format
    JSON.parse(metadata);

    // Create combined string
    const combinedMetadata = metadata + JSON.stringify(payerData);

    // Calculate SHA256 hash
    return createHash("sha256")
      .update(Buffer.from(combinedMetadata, "utf8"))
      .digest();
  } catch (error) {
    throw new Error(`Invalid metadata format: ${error.message}`);
  }
};

/**
 * Validates a hex string
 * @private
 * @param {string} str - String to validate
 * @returns {boolean} True if string is valid hex
 */
const isValidHexString = (str) => {
  return typeof str === "string" && /^[0-9a-fA-F]+$/.test(str);
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
  PayerDataField,
  createPayerDataRequest,
  createPayerData,
  validatePayerData,
  calculateMetadataHash,
  createSuccessResponse,
  createErrorResponse,
};
