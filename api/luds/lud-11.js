/**
 * Implementation of LUD-11: disposable field for payRequest
 * @see https://github.com/lnurl/luds/blob/luds/11.md
 *
 * This spec adds support for indicating whether LNURL links should be
 * stored by wallets or discarded after use.
 */

/**
 * Creates a payment response with the disposable flag
 * @param {string} pr - BOLT11 payment request
 * @param {Object} [successAction] - Optional success action object (LUD-09/10)
 * @param {boolean} [disposable] - Whether the LNURL should be discarded after use (defaults to true)
 * @returns {{pr: string, routes: Array, successAction?: Object, disposable?: boolean}}
 * @throws {Error} If pr is missing or invalid
 */
export const createPaymentResponse = (
  pr,
  successAction = undefined,
  disposable = true,
) => {
  if (!pr || typeof pr !== "string") {
    throw new Error("Payment request must be a non-empty string");
  }

  const response = {
    pr,
    routes: [],
  };

  // Only include successAction if provided
  if (successAction) {
    response.successAction = successAction;
  }

  // Only include disposable if false (following spec default behavior)
  if (disposable === false) {
    response.disposable = false;
  }

  return response;
};

/**
 * Determines if a payment response indicates the LNURL should be disposed
 * @param {Object} response - Payment response object
 * @param {string} response.pr - BOLT11 payment request
 * @param {boolean} [response.disposable] - Whether the LNURL should be discarded
 * @returns {boolean} True if the LNURL should be discarded after use
 */
export const isDisposable = (response) => {
  // According to spec: if disposable is null/undefined, interpret as true
  return response.disposable !== false;
};

/**
 * Validates a payment response object
 * @param {Object} response - Payment response to validate
 * @param {string} response.pr - BOLT11 payment request
 * @param {Object} [response.successAction] - Optional success action
 * @param {boolean} [response.disposable] - Optional disposable flag
 * @returns {boolean} True if the response is valid
 * @throws {Error} If the response is invalid
 */
export const validatePaymentResponse = (response) => {
  if (!response || typeof response !== "object") {
    throw new Error("Response must be an object");
  }

  // Validate required fields
  if (!response.pr || typeof response.pr !== "string") {
    throw new Error("Payment request must be a non-empty string");
  }

  if (!Array.isArray(response.routes)) {
    throw new Error("Routes must be an array");
  }

  // Validate optional fields
  if ("disposable" in response && typeof response.disposable !== "boolean") {
    throw new Error("If present, disposable must be a boolean");
  }

  if (
    "successAction" in response &&
    (!response.successAction || typeof response.successAction !== "object")
  ) {
    throw new Error("If present, successAction must be an object");
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
  createPaymentResponse,
  isDisposable,
  validatePaymentResponse,
  createSuccessResponse,
  createErrorResponse,
};
