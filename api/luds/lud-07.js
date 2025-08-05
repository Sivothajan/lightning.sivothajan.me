/**
 * Implementation of LUD-07: hostedChannelRequest base specification
 * @see https://github.com/lnurl/luds/blob/luds/07.md
 *
 * Wallet to service interaction flow:
 * 1. User scans LNURL QR code or accesses lightning:LNURL link
 * 2. LN WALLET makes GET request to LN SERVICE using decoded LNURL
 * 3. LN SERVICE returns hostedChannelRequest data
 * 4. LN WALLET connects to target node using uri
 * 5. LN WALLET sends InvokeHostedChannel message with k1
 * 6. Hosted channel protocol takes over
 */

/**
 * Validates a Lightning Network node URI
 * @param {string} uri - Remote node address in format node_key@ip_address:port_number
 * @returns {{isValid: boolean, reason?: string}} Validation result
 */
export const validateNodeUri = (uri) => {
  try {
    if (typeof uri !== "string" || !uri.trim()) {
      return {
        isValid: false,
        reason: "URI must be a non-empty string",
      };
    }

    // Split URI into parts
    const [nodeKey, address] = uri.split("@");
    if (!nodeKey || !address) {
      return {
        isValid: false,
        reason: "URI must be in format: node_key@ip_address:port_number",
      };
    }

    // Validate node key (should be 66 hex chars - 33 bytes)
    if (!/^[0-9a-fA-F]{66}$/.test(nodeKey)) {
      return {
        isValid: false,
        reason: "Invalid node key: must be 33 bytes hex encoded",
      };
    }

    // Split address into IP and port
    const [ipAddress, port] = address.split(":");
    if (!ipAddress || !port) {
      return {
        isValid: false,
        reason: "Address must include both IP and port",
      };
    }

    // Validate port number
    const portNum = parseInt(port, 10);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      return {
        isValid: false,
        reason: "Invalid port number: must be between 1 and 65535",
      };
    }

    // Basic IP address validation (IPv4 or IPv6)
    // This is a simplified check - consider using a dedicated IP validation library for production
    if (!ipAddress.includes(".") && !ipAddress.includes(":")) {
      return {
        isValid: false,
        reason: "Invalid IP address format",
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      reason: `URI validation error: ${error.message}`,
    };
  }
};

/**
 * Validates a k1 challenge string
 * @param {string} k1 - Second-level hex encoded secret byte array
 * @returns {{isValid: boolean, reason?: string}} Validation result
 */
export const validateK1 = (k1) => {
  try {
    if (typeof k1 !== "string" || !k1.trim()) {
      return {
        isValid: false,
        reason: "k1 must be a non-empty string",
      };
    }

    // k1 should be hex encoded
    if (!/^[0-9a-fA-F]+$/.test(k1)) {
      return {
        isValid: false,
        reason: "k1 must be hex encoded",
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      reason: `k1 validation error: ${error.message}`,
    };
  }
};

/**
 * Creates a hosted channel request response object as per LUD-07 spec
 * @param {string} uri - Remote node address of form node_key@ip_address:port_number
 * @param {string} k1 - Second-level hex encoded secret byte array
 * @param {string} [alias] - Optional remote node alias
 * @returns {{uri: string, k1: string, alias?: string, tag: string} | {status: string, reason: string}}
 */
export const createHostedChannelRequest = (uri, k1, alias = undefined) => {
  try {
    // Validate URI
    const uriValidation = validateNodeUri(uri);
    if (!uriValidation.isValid) {
      return {
        status: "ERROR",
        reason: uriValidation.reason,
      };
    }

    // Validate k1
    const k1Validation = validateK1(k1);
    if (!k1Validation.isValid) {
      return {
        status: "ERROR",
        reason: k1Validation.reason,
      };
    }

    // Validate alias if provided
    if (alias !== undefined && (typeof alias !== "string" || !alias.trim())) {
      return {
        status: "ERROR",
        reason: "If provided, alias must be a non-empty string",
      };
    }

    // Construct response
    const response = {
      uri,
      k1,
      tag: "hostedChannelRequest",
    };

    // Add alias if provided
    if (alias) {
      response.alias = alias;
    }

    return response;
  } catch (error) {
    return {
      status: "ERROR",
      reason: error.message,
    };
  }
};

/**
 * Creates a success response for service callbacks
 * @returns {{status: string}}
 */
export const createSuccessResponse = () => ({
  status: "OK",
});

/**
 * Creates an error response for service callbacks
 * @param {string} reason - The error reason
 * @returns {{status: string, reason: string}}
 */
export const createErrorResponse = (reason) => ({
  status: "ERROR",
  reason,
});

export default {
  createHostedChannelRequest,
  validateNodeUri,
  validateK1,
  createSuccessResponse,
  createErrorResponse,
};
