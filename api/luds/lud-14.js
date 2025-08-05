/**
 * Implementation of LUD-14: balanceCheck for reusable withdrawRequest
 * @see https://github.com/lnurl/luds/blob/luds/14.md
 *
 * This extends LUD-03 by adding balance check capabilities and
 * support for automatic withdrawals.
 */

/**
 * Creates a withdraw request with balance check support
 * @param {string} callback - URL where LN SERVICE accepts withdrawal Lightning invoice
 * @param {string} k1 - Random string to identify user's LN WALLET
 * @param {string} defaultDescription - Default withdrawal invoice description
 * @param {number} minWithdrawable - Minimum withdrawable amount in millisatoshis
 * @param {number} maxWithdrawable - Maximum withdrawable amount in millisatoshis
 * @param {string} balanceCheck - URL for checking balance in the future
 * @param {number} [currentBalance] - Optional current balance if different from maxWithdrawable
 * @returns {Object} Withdraw request with balance check
 * @throws {Error} If any parameter is invalid
 */
export const createWithdrawRequest = (
  callback,
  k1,
  defaultDescription,
  minWithdrawable,
  maxWithdrawable,
  balanceCheck,
  currentBalance,
) => {
  // Input validation
  if (!callback || typeof callback !== "string") {
    throw new Error("Callback URL must be a non-empty string");
  }

  if (!k1 || typeof k1 !== "string") {
    throw new Error("k1 must be a non-empty string");
  }

  if (!defaultDescription || typeof defaultDescription !== "string") {
    throw new Error("Default description must be a non-empty string");
  }

  if (!Number.isInteger(minWithdrawable) || minWithdrawable < 0) {
    throw new Error(
      "Minimum withdrawable amount must be a non-negative integer",
    );
  }

  if (!Number.isInteger(maxWithdrawable) || maxWithdrawable < minWithdrawable) {
    throw new Error(
      "Maximum withdrawable amount must be >= minimum withdrawable amount",
    );
  }

  if (!balanceCheck || typeof balanceCheck !== "string") {
    throw new Error("Balance check URL must be a non-empty string");
  }

  // Validate URLs
  try {
    new URL(callback);
    new URL(balanceCheck);
  } catch (error) {
    throw new Error("Invalid URL format");
  }

  // Create base response
  const response = {
    tag: "withdrawRequest",
    callback,
    k1,
    defaultDescription,
    minWithdrawable,
    maxWithdrawable,
    balanceCheck,
  };

  // Add currentBalance if provided and valid
  if (currentBalance !== undefined) {
    if (!Number.isInteger(currentBalance) || currentBalance < 0) {
      throw new Error("Current balance must be a non-negative integer");
    }
    response.currentBalance = currentBalance;
  }

  return response;
};

/**
 * Validates a balance check URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 * @throws {Error} If URL is invalid
 */
export const validateBalanceCheckUrl = (url) => {
  if (!url || typeof url !== "string") {
    throw new Error("Balance check URL must be a non-empty string");
  }

  try {
    const parsed = new URL(url);
    if (!parsed.protocol.startsWith("http")) {
      throw new Error("Balance check URL must use HTTP(S) protocol");
    }
    return true;
  } catch (error) {
    throw new Error("Invalid balance check URL format");
  }
};

/**
 * Extracts the actual balance from a withdraw request
 * @param {Object} response - Withdraw request response
 * @returns {number} Current balance in millisatoshis
 * @throws {Error} If response is invalid
 */
export const getBalance = (response) => {
  if (!response || typeof response !== "object") {
    throw new Error("Invalid response object");
  }

  if (response.tag !== "withdrawRequest") {
    throw new Error("Response must be a withdrawRequest");
  }

  // Return currentBalance if present, otherwise maxWithdrawable
  if ("currentBalance" in response) {
    if (
      !Number.isInteger(response.currentBalance) ||
      response.currentBalance < 0
    ) {
      throw new Error("Invalid currentBalance value");
    }
    return response.currentBalance;
  }

  if (
    !Number.isInteger(response.maxWithdrawable) ||
    response.maxWithdrawable < 0
  ) {
    throw new Error("Invalid maxWithdrawable value");
  }

  return response.maxWithdrawable;
};

/**
 * Updates stored balance check URL from a new response
 * @param {Object} response - New withdraw request response
 * @returns {string|null} New balance check URL or null if none provided
 * @throws {Error} If response is invalid
 */
export const updateBalanceCheckUrl = (response) => {
  if (!response || typeof response !== "object") {
    throw new Error("Invalid response object");
  }

  if (response.tag !== "withdrawRequest") {
    throw new Error("Response must be a withdrawRequest");
  }

  // Return null if no balanceCheck URL in new response
  if (!response.balanceCheck) {
    return null;
  }

  // Validate and return new URL
  validateBalanceCheckUrl(response.balanceCheck);
  return response.balanceCheck;
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
  createWithdrawRequest,
  validateBalanceCheckUrl,
  getBalance,
  updateBalanceCheckUrl,
  createSuccessResponse,
  createErrorResponse,
};
