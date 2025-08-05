/**
 * Implementation of LUD-17: Protocol schemes and raw URLs
 * @see https://github.com/lnurl/luds/blob/luds/17.md
 *
 * This spec defines protocol-specific URL schemes and removes bech32 encoding.
 * Implementation supports both old and new methods for backward compatibility.
 */

/**
 * LNURL Protocol types and their corresponding schemes
 * @readonly
 * @enum {Object}
 */
export const LnurlProtocol = {
  CHANNEL: {
    scheme: "lnurlc",
    tag: "channelRequest",
  },
  WITHDRAW: {
    scheme: "lnurlw",
    tag: "withdrawRequest",
  },
  PAY: {
    scheme: "lnurlp",
    tag: "payRequest",
  },
  AUTH: {
    scheme: "keyauth",
    tag: "login",
  },
};

/**
 * Checks if a URL uses one of the new LNURL protocol schemes
 * @param {string} url - URL to check
 * @returns {boolean} True if URL uses new protocol scheme
 */
export const isLnurlProtocol = (url) => {
  if (!url || typeof url !== "string") {
    return false;
  }

  const schemes = Object.values(LnurlProtocol).map((p) => p.scheme);
  return schemes.some((scheme) => url.toLowerCase().startsWith(`${scheme}://`));
};

/**
 * Gets protocol information from URL
 * @param {string} url - URL to analyze
 * @returns {{scheme: string, tag: string}|null} Protocol info or null if not LNURL
 */
export const getLnurlProtocolInfo = (url) => {
  if (!url || typeof url !== "string") {
    return null;
  }

  const lowerUrl = url.toLowerCase();
  return (
    Object.values(LnurlProtocol).find((protocol) =>
      lowerUrl.startsWith(`${protocol.scheme}://`),
    ) || null
  );
};

/**
 * Converts a new protocol URL to its HTTP(S) equivalent
 * @param {string} url - LNURL protocol URL
 * @returns {string} HTTP(S) URL for making the request
 * @throws {Error} If URL is invalid or uses unsupported protocol
 */
export const convertToHttpUrl = (url) => {
  if (!url || typeof url !== "string") {
    throw new Error("URL must be a non-empty string");
  }

  try {
    // Parse URL to get components
    const parsed = new URL(url);
    const protocol = parsed.protocol.slice(0, -1); // Remove trailing ':'

    // Validate protocol
    if (!Object.values(LnurlProtocol).some((p) => p.scheme === protocol)) {
      throw new Error(`Unsupported protocol: ${protocol}`);
    }

    // Determine HTTP protocol based on domain
    const httpProtocol = parsed.hostname.endsWith(".onion") ? "http" : "https";

    // Construct new URL with all components
    return new URL(
      `${httpProtocol}://${parsed.host}${parsed.pathname}${parsed.search}${parsed.hash}`,
    ).toString();
  } catch (error) {
    throw new Error(`Invalid URL format: ${error.message}`);
  }
};

/**
 * Creates a new protocol URL from HTTP(S) URL and protocol type
 * @param {string} url - HTTP(S) URL to convert
 * @param {string} protocolType - Protocol type (e.g., 'CHANNEL', 'PAY')
 * @returns {string} New protocol URL
 * @throws {Error} If inputs are invalid
 */
export const createLnurlProtocolUrl = (url, protocolType) => {
  if (!url || typeof url !== "string") {
    throw new Error("URL must be a non-empty string");
  }

  if (!protocolType || !LnurlProtocol[protocolType]) {
    throw new Error("Invalid protocol type");
  }

  try {
    const parsed = new URL(url);

    // Ensure URL uses HTTP(S)
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("URL must use HTTP(S) protocol");
    }

    // Replace protocol with new scheme
    const newProtocol = LnurlProtocol[protocolType].scheme;
    return new URL(
      `${newProtocol}://${parsed.host}${parsed.pathname}${parsed.search}${parsed.hash}`,
    ).toString();
  } catch (error) {
    throw new Error(`Invalid URL format: ${error.message}`);
  }
};

/**
 * Validates a URL against a specific LNURL protocol type
 * @param {string} url - URL to validate
 * @param {string} protocolType - Expected protocol type
 * @returns {boolean} True if URL is valid for protocol
 * @throws {Error} If URL is invalid or protocol type mismatch
 */
export const validateProtocolUrl = (url, protocolType) => {
  if (!url || typeof url !== "string") {
    throw new Error("URL must be a non-empty string");
  }

  if (!protocolType || !LnurlProtocol[protocolType]) {
    throw new Error("Invalid protocol type");
  }

  const protocol = getLnurlProtocolInfo(url);
  if (!protocol) {
    throw new Error("Not a valid LNURL protocol URL");
  }

  if (protocol.tag !== LnurlProtocol[protocolType].tag) {
    throw new Error(
      `URL protocol does not match expected type ${protocolType}`,
    );
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
  LnurlProtocol,
  isLnurlProtocol,
  getLnurlProtocolInfo,
  convertToHttpUrl,
  createLnurlProtocolUrl,
  validateProtocolUrl,
  createSuccessResponse,
  createErrorResponse,
};
