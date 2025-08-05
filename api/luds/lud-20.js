/**
 * Implementation of LUD-20: Long payment description for pay protocol
 * @see https://github.com/lnurl/luds/blob/luds/20.md
 *
 * This spec adds support for longer, more detailed payment descriptions
 * in the LNURL-pay protocol metadata.
 */

/**
 * Metadata entry types
 * @readonly
 * @enum {string}
 */
export const MetadataType = {
  PLAIN: "text/plain",
  LONG_DESC: "text/long-desc",
  IMAGE_PNG: "image/png;base64",
  IMAGE_JPEG: "image/jpeg;base64",
};

/**
 * Creates metadata with optional long description
 * @param {string} plainDesc - Required short description
 * @param {string} [longDesc] - Optional detailed description
 * @param {Object} [options] - Additional metadata options
 * @param {string} [options.imagePng] - Base64 encoded PNG image
 * @param {string} [options.imageJpeg] - Base64 encoded JPEG image
 * @returns {Array} Metadata array with all entries
 * @throws {Error} If inputs are invalid
 */
export const createMetadata = (plainDesc, longDesc, options = {}) => {
  // Validate required plain description
  if (!plainDesc || typeof plainDesc !== "string") {
    throw new Error("Plain description is required and must be a string");
  }

  const metadata = [[MetadataType.PLAIN, plainDesc]];

  // Add long description if provided
  if (longDesc !== undefined) {
    if (typeof longDesc !== "string") {
      throw new Error("Long description must be a string");
    }
    metadata.push([MetadataType.LONG_DESC, longDesc]);
  }

  // Add image if provided (only one type allowed)
  if (options.imagePng && options.imageJpeg) {
    throw new Error("Cannot include both PNG and JPEG images");
  }

  if (options.imagePng) {
    if (!isValidBase64(options.imagePng)) {
      throw new Error("PNG image must be base64 encoded");
    }
    metadata.push([MetadataType.IMAGE_PNG, options.imagePng]);
  } else if (options.imageJpeg) {
    if (!isValidBase64(options.imageJpeg)) {
      throw new Error("JPEG image must be base64 encoded");
    }
    metadata.push([MetadataType.IMAGE_JPEG, options.imageJpeg]);
  }

  return metadata;
};

/**
 * Extracts descriptions from metadata
 * @param {Array} metadata - Metadata array from pay request
 * @returns {{plain: string, long?: string}} Extracted descriptions
 * @throws {Error} If metadata is invalid or missing required description
 */
export const extractDescriptions = (metadata) => {
  if (!Array.isArray(metadata)) {
    throw new Error("Metadata must be an array");
  }

  const result = {};

  for (const entry of metadata) {
    if (!Array.isArray(entry) || entry.length !== 2) {
      continue;
    }

    const [type, content] = entry;
    if (type === MetadataType.PLAIN) {
      result.plain = content;
    } else if (type === MetadataType.LONG_DESC) {
      result.long = content;
    }
  }

  if (!result.plain) {
    throw new Error("Metadata must contain text/plain description");
  }

  return result;
};

/**
 * Gets the display description for a payment
 * @param {Array} metadata - Metadata array from pay request
 * @param {Object} [options] - Display options
 * @param {boolean} [options.preferLong=true] - Prefer long description if available
 * @param {boolean} [options.includeBoth=false] - Include both descriptions if available
 * @returns {{primary: string, secondary?: string}} Description(s) to display
 * @throws {Error} If metadata is invalid
 */
export const getDisplayDescription = (metadata, options = {}) => {
  const { preferLong = true, includeBoth = false } = options;

  const descriptions = extractDescriptions(metadata);

  // If no long description or not preferred, just return plain
  if (!descriptions.long || !preferLong) {
    return { primary: descriptions.plain };
  }

  // If including both, return both with long as primary
  if (includeBoth) {
    return {
      primary: descriptions.long,
      secondary: descriptions.plain,
    };
  }

  // Otherwise return long description only
  return { primary: descriptions.long };
};

/**
 * Validates metadata array
 * @param {Array} metadata - Metadata array to validate
 * @returns {boolean} True if metadata is valid
 * @throws {Error} If metadata is invalid
 */
export const validateMetadata = (metadata) => {
  if (!Array.isArray(metadata)) {
    throw new Error("Metadata must be an array");
  }

  let hasPlainText = false;
  let hasImage = false;

  for (const entry of metadata) {
    if (!Array.isArray(entry) || entry.length !== 2) {
      throw new Error("Each metadata entry must be an array with 2 elements");
    }

    const [type, content] = entry;

    switch (type) {
      case MetadataType.PLAIN:
        hasPlainText = true;
        if (typeof content !== "string") {
          throw new Error("Plain description must be a string");
        }
        break;

      case MetadataType.LONG_DESC:
        if (typeof content !== "string") {
          throw new Error("Long description must be a string");
        }
        break;

      case MetadataType.IMAGE_PNG:
      case MetadataType.IMAGE_JPEG:
        if (hasImage) {
          throw new Error("Only one image type allowed");
        }
        if (!isValidBase64(content)) {
          throw new Error("Image must be base64 encoded");
        }
        hasImage = true;
        break;

      default:
        // Unknown types are allowed for future compatibility
        break;
    }
  }

  if (!hasPlainText) {
    throw new Error("Metadata must contain text/plain description");
  }

  return true;
};

/**
 * Checks if a string is valid base64
 * @private
 * @param {string} str - String to check
 * @returns {boolean} True if string is valid base64
 */
const isValidBase64 = (str) => {
  if (typeof str !== "string") {
    return false;
  }
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
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
  MetadataType,
  createMetadata,
  extractDescriptions,
  getDisplayDescription,
  validateMetadata,
  createSuccessResponse,
  createErrorResponse,
};
