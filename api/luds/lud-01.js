import { bech32 } from "bech32";

/**
 * Implementation of LUD-01: Base LNURL encoding and decoding specification
 * @see https://github.com/lnurl/luds/blob/luds/01.md
 */

/**
 * Validates if a URL is a valid HTTPS or Onion URL according to LUD-01 spec
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if URL is valid according to spec
 */
export const isValidLNURL = (url) => {
  try {
    const urlObj = new URL(url);
    return (
      // Must be either HTTPS clearnet or HTTP onion
      (urlObj.protocol === "https:" && !urlObj.hostname.endsWith(".onion")) ||
      (urlObj.protocol === "http:" && urlObj.hostname.endsWith(".onion"))
    );
  } catch (error) {
    return false;
  }
};

/**
 * Encodes a URL into a LNURL bech32 string
 * @param {string} url - The URL to encode (must be HTTPS clearnet or HTTP onion)
 * @param {boolean} [uppercase=true] - Whether to return uppercase (default) or lowercase
 * @returns {{encoded: string} | {error: string}} - The bech32-encoded LNURL or error object
 */
export const encodeLNURL = (url, uppercase = true) => {
  try {
    // Validate URL format
    if (!isValidLNURL(url)) {
      return {
        error: "Invalid URL: Must be HTTPS clearnet or HTTP onion URL",
      };
    }

    // Convert URL to byte array
    const words = bech32.toWords(Buffer.from(url, "utf8"));

    // Encode with bech32
    const encoded = bech32.encode("lnurl", words, 2000);

    // Return in requested case
    return {
      encoded: uppercase ? encoded.toUpperCase() : encoded.toLowerCase(),
    };
  } catch (error) {
    return {
      error: `Encoding failed: ${error.message}`,
    };
  }
};

/**
 * Decodes a bech32-encoded LNURL string
 * @param {string} lnurl - The bech32-encoded LNURL string
 * @returns {{decoded: string} | {error: string}} - The decoded URL or error object
 */
export const decodeLNURL = (lnurl) => {
  try {
    // Normalize case - bech32 decode accepts either case
    const normalizedLnurl = lnurl.toLowerCase();

    // Validate no mixed case in original input
    if (lnurl !== lnurl.toLowerCase() && lnurl !== lnurl.toUpperCase()) {
      return {
        error: "Invalid LNURL: Must be all uppercase or all lowercase",
      };
    }

    // Decode bech32
    const { prefix, words } = bech32.decode(normalizedLnurl, 2000);

    // Verify prefix
    if (prefix !== "lnurl") {
      return {
        error: 'Invalid LNURL: Must start with "lnurl" prefix',
      };
    }

    // Convert words back to URL string
    const decoded = Buffer.from(bech32.fromWords(words)).toString();

    // Validate decoded URL
    if (!isValidLNURL(decoded)) {
      return {
        error:
          "Invalid LNURL: Decoded URL must be HTTPS clearnet or HTTP onion",
      };
    }

    return { decoded };
  } catch (error) {
    return {
      error: `Decoding failed: ${error.message}`,
    };
  }
};

/**
 * Extracts an LNURL from a lightning fallback scheme
 * @param {string} url - URL that may contain an LNURL in the lightning parameter
 * @returns {{lnurl: string} | {error: string}} - The extracted LNURL or error object
 */
export const extractLNURLFromFallback = (url) => {
  try {
    const urlObj = new URL(url);
    const lnurl = urlObj.searchParams.get("lightning");

    if (!lnurl) {
      return {
        error: "No lightning parameter found in URL",
      };
    }

    return { lnurl };
  } catch (error) {
    return {
      error: `Invalid URL: ${error.message}`,
    };
  }
};

export default {
  encodeLNURL,
  decodeLNURL,
  isValidLNURL,
  extractLNURLFromFallback,
};
