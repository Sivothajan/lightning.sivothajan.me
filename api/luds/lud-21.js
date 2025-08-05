/**
 * Implementation of LUD-21: verify base spec
 * @see https://github.com/lnurl/luds/blob/luds/21.md
 *
 * This spec adds support for invoice verification through LNURL services,
 * allowing services to check payment status without direct node access.
 */

/**
 * Response status types
 * @readonly
 * @enum {string}
 */
export const Status = {
  OK: "OK",
  ERROR: "ERROR",
};

/**
 * Creates a callback response with optional verify URL
 * @param {Object} params - Response parameters
 * @param {string} params.pr - Lightning Network payment request
 * @param {string[]} [params.routes=[]] - Optional routing hints
 * @param {string} [params.verifyUrl] - Optional URL for payment verification
 * @returns {Object} Callback response object
 * @throws {Error} If required parameters are missing or invalid
 */
export const createCallbackResponse = ({ pr, routes = [], verifyUrl }) => {
  if (!pr || typeof pr !== "string") {
    throw new Error("Payment request (pr) is required and must be a string");
  }

  if (!Array.isArray(routes)) {
    throw new Error("Routes must be an array");
  }

  const response = {
    status: Status.OK,
    routes,
    pr,
  };

  // Add verify URL if provided
  if (verifyUrl) {
    if (typeof verifyUrl !== "string" || !isValidUrl(verifyUrl)) {
      throw new Error("Verify URL must be a valid URL string");
    }
    response.verify = verifyUrl;
  }

  return response;
};

/**
 * Creates a verification response for a paid invoice
 * @param {Object} params - Response parameters
 * @param {string} params.preimage - Payment preimage
 * @param {string} params.pr - Original payment request
 * @returns {Object} Verification response object
 * @throws {Error} If required parameters are missing or invalid
 */
export const createPaidVerifyResponse = ({ preimage, pr }) => {
  if (!preimage || typeof preimage !== "string") {
    throw new Error("Preimage is required and must be a string");
  }
  if (!pr || typeof pr !== "string") {
    throw new Error("Payment request (pr) is required and must be a string");
  }

  return {
    status: Status.OK,
    settled: true,
    preimage,
    pr,
  };
};

/**
 * Creates a verification response for an unpaid invoice
 * @param {string} pr - Original payment request
 * @returns {Object} Verification response object
 * @throws {Error} If payment request is missing or invalid
 */
export const createUnpaidVerifyResponse = (pr) => {
  if (!pr || typeof pr !== "string") {
    throw new Error("Payment request (pr) is required and must be a string");
  }

  return {
    status: Status.OK,
    settled: false,
    preimage: null,
    pr,
  };
};

/**
 * Creates an error response for verification
 * @param {string} reason - Error reason
 * @returns {Object} Error response object
 * @throws {Error} If reason is missing or invalid
 */
export const createVerifyErrorResponse = (reason) => {
  if (!reason || typeof reason !== "string") {
    throw new Error("Error reason is required and must be a string");
  }

  return {
    status: Status.ERROR,
    reason,
  };
};

/**
 * Validates a verification response object
 * @param {Object} response - Response object to validate
 * @returns {boolean} True if response is valid
 * @throws {Error} If response is invalid
 */
export const validateVerifyResponse = (response) => {
  if (!response || typeof response !== "object") {
    throw new Error("Response must be an object");
  }

  if (!response.status || typeof response.status !== "string") {
    throw new Error("Response must have a status string");
  }

  if (response.status === Status.ERROR) {
    if (!response.reason || typeof response.reason !== "string") {
      throw new Error("Error response must have a reason string");
    }
    return true;
  }

  if (response.status === Status.OK) {
    if (typeof response.settled !== "boolean") {
      throw new Error("OK response must have a settled boolean");
    }
    if (!response.pr || typeof response.pr !== "string") {
      throw new Error("OK response must have a pr string");
    }
    if (response.settled) {
      if (!response.preimage || typeof response.preimage !== "string") {
        throw new Error("Settled response must have a preimage string");
      }
    } else {
      if (response.preimage !== null) {
        throw new Error("Unsettled response must have null preimage");
      }
    }
    return true;
  }

  throw new Error("Invalid response status");
};

/**
 * Validates that a string is a valid URL
 * @private
 * @param {string} urlString - URL string to validate
 * @returns {boolean} True if string is a valid URL
 */
const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Processes a verification response
 * @param {Object} response - Raw verification response
 * @returns {Object} Processed and validated response
 * @throws {Error} If response is invalid
 */
export const processVerifyResponse = (response) => {
  validateVerifyResponse(response);
  return response;
};

/**
 * Creates a unique verification URL
 * @param {Object} params - URL parameters
 * @param {string} params.baseUrl - Base URL of the verification service
 * @param {string} params.paymentHash - Payment hash to verify
 * @returns {string} Complete verification URL
 * @throws {Error} If parameters are invalid
 */
export const createVerifyUrl = ({ baseUrl, paymentHash }) => {
  if (!baseUrl || typeof baseUrl !== "string" || !isValidUrl(baseUrl)) {
    throw new Error("Base URL must be a valid URL string");
  }
  if (!paymentHash || typeof paymentHash !== "string") {
    throw new Error("Payment hash is required and must be a string");
  }

  // Ensure baseUrl ends with /
  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  return `${normalizedBaseUrl}${paymentHash}`;
};

export default {
  Status,
  createCallbackResponse,
  createPaidVerifyResponse,
  createUnpaidVerifyResponse,
  createVerifyErrorResponse,
  validateVerifyResponse,
  processVerifyResponse,
  createVerifyUrl,
};
