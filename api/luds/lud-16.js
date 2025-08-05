/**
 * Implementation of LUD-16: Paying to static internet identifiers
 * @see https://github.com/lnurl/luds/blob/luds/16.md
 *
 * This spec defines a standard for human-readable Lightning addresses
 * in the format username@domain.com with optional +tags.
 */

/**
 * Regex for valid usernames (a-z0-9-_.)
 * @constant {RegExp}
 */
const USERNAME_REGEX = /^[a-z0-9\-_.]+$/;

/**
 * Regex for valid username with optional tag (username+tag)
 * @constant {RegExp}
 */
const USERNAME_WITH_TAG_REGEX = /^([a-z0-9\-_.]+)(?:\+([a-z0-9\-_.]+))?$/;

/**
 * Metadata types for internet identifiers
 * @readonly
 * @enum {string}
 */
export const MetadataType = {
  IDENTIFIER: "text/identifier",
  EMAIL: "text/email",
  TAG: "text/tag",
};

/**
 * Parses a Lightning address into its components
 * @param {string} address - Lightning address (e.g., user@domain.com or user+tag@domain.com)
 * @returns {{username: string, tag?: string, domain: string}} Parsed components
 * @throws {Error} If address format is invalid
 */
export const parseLightningAddress = (address) => {
  if (!address || typeof address !== "string") {
    throw new Error("Address must be a non-empty string");
  }

  // Split address into username@domain parts
  const parts = address.toLowerCase().split("@");
  if (parts.length !== 2) {
    throw new Error("Invalid address format: must be username@domain");
  }

  const [usernameWithTag, domain] = parts;

  // Validate domain
  if (!domain || !domain.includes(".")) {
    throw new Error("Invalid domain format");
  }

  // Parse username and optional tag
  const match = usernameWithTag.match(USERNAME_WITH_TAG_REGEX);
  if (!match) {
    throw new Error(
      "Invalid username format: only a-z0-9-_. and + (for tags) allowed",
    );
  }

  const [, username, tag] = match;
  return { username, tag, domain };
};

/**
 * Generates the LNURL endpoint for a Lightning address
 * @param {string} address - Lightning address to generate endpoint for
 * @returns {{url: string, username: string, tag?: string}} Endpoint URL and parsed components
 * @throws {Error} If address is invalid
 */
export const getLnurlpEndpoint = (address) => {
  const { username, tag, domain } = parseLightningAddress(address);

  // Determine protocol based on domain (.onion = http, others = https)
  const protocol = domain.endsWith(".onion") ? "http" : "https";

  // Construct the endpoint URL
  const path = tag ? `${username}+${tag}` : username;
  const url = `${protocol}://${domain}/.well-known/lnurlp/${path}`;

  return { url, username, tag };
};

/**
 * Creates metadata for a Lightning address
 * @param {string} address - Full Lightning address
 * @param {boolean} [isEmail=false] - Whether this is an actual email address
 * @param {string} [tag] - Optional tag if present in address
 * @returns {Array} Metadata array with appropriate entries
 */
export const createAddressMetadata = (
  address,
  isEmail = false,
  tag = undefined,
) => {
  const metadata = [
    [isEmail ? MetadataType.EMAIL : MetadataType.IDENTIFIER, address],
  ];

  // Add tag metadata if present
  if (tag) {
    metadata.push([MetadataType.TAG, tag]);
  }

  return metadata;
};

/**
 * Validates a Lightning address
 * @param {string} address - Address to validate
 * @returns {boolean} True if address is valid
 * @throws {Error} If address is invalid with detailed reason
 */
export const validateLightningAddress = (address) => {
  try {
    parseLightningAddress(address);
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Extracts metadata entries from a pay request response
 * @param {Array} metadata - Metadata array from pay request
 * @returns {{identifier?: string, email?: string, tag?: string}} Extracted values
 */
export const extractAddressMetadata = (metadata) => {
  if (!Array.isArray(metadata)) {
    throw new Error("Metadata must be an array");
  }

  const result = {};

  for (const entry of metadata) {
    if (!Array.isArray(entry) || entry.length !== 2) {
      continue;
    }

    const [type, value] = entry;
    switch (type) {
      case MetadataType.IDENTIFIER:
        result.identifier = value;
        break;
      case MetadataType.EMAIL:
        result.email = value;
        break;
      case MetadataType.TAG:
        result.tag = value;
        break;
    }
  }

  return result;
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
  parseLightningAddress,
  getLnurlpEndpoint,
  createAddressMetadata,
  validateLightningAddress,
  extractAddressMetadata,
  createSuccessResponse,
  createErrorResponse,
};
