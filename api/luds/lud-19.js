/**
 * Implementation of LUD-19: Pay link discoverable from withdraw link
 * @see https://github.com/lnurl/luds/blob/luds/19.md
 *
 * This spec extends LUD-03/14 by adding a payLink field to withdraw
 * requests, enabling unified deposit/withdraw interfaces.
 */

/**
 * Validates a pay link URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 * @throws {Error} If URL is invalid
 */
export const validatePayLink = (url) => {
  if (!url || typeof url !== "string") {
    throw new Error("Pay link must be a non-empty string");
  }

  try {
    const parsed = new URL(url);

    // Must be HTTP(S) or LNURLP protocol (LUD-17)
    if (!parsed.protocol.match(/^(https?|lnurlp):$/)) {
      throw new Error("Pay link must use HTTP(S) or LNURLP protocol");
    }

    // If HTTP(S), must be secure unless .onion
    if (parsed.protocol.startsWith("http")) {
      if (parsed.protocol === "http:" && !parsed.hostname.endsWith(".onion")) {
        throw new Error("HTTP is only allowed for .onion domains");
      }
    }

    return true;
  } catch (error) {
    throw new Error(`Invalid pay link format: ${error.message}`);
  }
};

/**
 * Creates a withdraw request with optional pay link
 * @param {Object} params - Withdraw request parameters
 * @param {string} params.callback - Callback URL for withdraw
 * @param {string} params.k1 - Random or non-random string for request identification
 * @param {string} params.defaultDescription - Default withdrawal description
 * @param {number} params.minWithdrawable - Minimum withdrawable amount in millisatoshis
 * @param {number} params.maxWithdrawable - Maximum withdrawable amount in millisatoshis
 * @param {string} [params.payLink] - Optional URL for deposits (LUD-19)
 * @param {string} [params.balanceCheck] - Optional URL for balance checks (LUD-14)
 * @returns {Object} Complete withdraw request
 * @throws {Error} If parameters are invalid
 */
export const createWithdrawRequest = (params) => {
  // Validate required parameters
  if (!params.callback || typeof params.callback !== "string") {
    throw new Error("Callback URL must be a non-empty string");
  }

  if (!params.k1 || typeof params.k1 !== "string") {
    throw new Error("k1 must be a non-empty string");
  }

  if (
    !params.defaultDescription ||
    typeof params.defaultDescription !== "string"
  ) {
    throw new Error("Default description must be a non-empty string");
  }

  if (!Number.isInteger(params.minWithdrawable) || params.minWithdrawable < 0) {
    throw new Error("Minimum withdrawable must be a non-negative integer");
  }

  if (
    !Number.isInteger(params.maxWithdrawable) ||
    params.maxWithdrawable < params.minWithdrawable
  ) {
    throw new Error("Maximum withdrawable must be >= minimum withdrawable");
  }

  // Create base response
  const response = {
    tag: "withdrawRequest",
    callback: params.callback,
    k1: params.k1,
    defaultDescription: params.defaultDescription,
    minWithdrawable: params.minWithdrawable,
    maxWithdrawable: params.maxWithdrawable,
  };

  // Add optional pay link if provided
  if (params.payLink) {
    validatePayLink(params.payLink);
    response.payLink = params.payLink;
  }

  // Add optional balance check if provided
  if (params.balanceCheck) {
    if (typeof params.balanceCheck !== "string") {
      throw new Error("Balance check URL must be a string");
    }
    response.balanceCheck = params.balanceCheck;
  }

  return response;
};

/**
 * Gets service information from a withdraw request
 * @param {Object} withdrawRequest - Withdraw request response
 * @returns {{canDeposit: boolean, canWithdraw: boolean, hasBalanceCheck: boolean}} Service capabilities
 * @throws {Error} If request is invalid
 */
export const getServiceCapabilities = (withdrawRequest) => {
  if (!withdrawRequest || typeof withdrawRequest !== "object") {
    throw new Error("Invalid withdraw request");
  }

  if (withdrawRequest.tag !== "withdrawRequest") {
    throw new Error("Not a withdraw request");
  }

  return {
    canDeposit: !!withdrawRequest.payLink,
    canWithdraw: true, // It's a withdraw request, so always true
    hasBalanceCheck: !!withdrawRequest.balanceCheck,
  };
};

/**
 * Creates a unified service entry for wallet storage
 * @param {Object} withdrawRequest - Withdraw request with optional payLink
 * @returns {Object} Unified service entry
 * @throws {Error} If request is invalid
 */
export const createUnifiedServiceEntry = (withdrawRequest) => {
  if (!withdrawRequest || typeof withdrawRequest !== "object") {
    throw new Error("Invalid withdraw request");
  }

  if (withdrawRequest.tag !== "withdrawRequest") {
    throw new Error("Not a withdraw request");
  }

  const entry = {
    withdrawEndpoint: withdrawRequest.callback,
    minWithdraw: withdrawRequest.minWithdrawable,
    maxWithdraw: withdrawRequest.maxWithdrawable,
  };

  // Add optional fields if present
  if (withdrawRequest.payLink) {
    entry.payEndpoint = withdrawRequest.payLink;
  }

  if (withdrawRequest.balanceCheck) {
    entry.balanceCheckEndpoint = withdrawRequest.balanceCheck;
  }

  return entry;
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
  validatePayLink,
  createWithdrawRequest,
  getServiceCapabilities,
  createUnifiedServiceEntry,
  createSuccessResponse,
  createErrorResponse,
};
