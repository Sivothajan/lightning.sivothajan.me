/**
 * Implementation of LUD-15: balanceNotify for instant withdraw notifications
 * @see https://github.com/lnurl/luds/blob/luds/15.md
 *
 * This extends LUD-14 by allowing services to notify wallets immediately
 * when a balance is available for withdrawal.
 */

/**
 * Maximum length for notification URLs to keep callback URLs reasonable
 * @constant {number}
 */
const MAX_NOTIFY_URL_LENGTH = 1024;

/**
 * Adds balance notification URL to a withdraw callback
 * @param {string} callbackUrl - Base callback URL
 * @param {string} k1 - The k1 parameter from withdrawRequest
 * @param {string} paymentRequest - BOLT11 invoice for withdrawal
 * @param {string} notifyUrl - URL where service should notify of new balance
 * @returns {string} Complete callback URL with notification
 * @throws {Error} If any parameter is invalid or resulting URL would be too long
 */
export const addBalanceNotify = (
  callbackUrl,
  k1,
  paymentRequest,
  notifyUrl,
) => {
  try {
    // Validate inputs
    if (!callbackUrl || typeof callbackUrl !== "string") {
      throw new Error("Callback URL must be a non-empty string");
    }

    if (!k1 || typeof k1 !== "string") {
      throw new Error("k1 must be a non-empty string");
    }

    if (!paymentRequest || typeof paymentRequest !== "string") {
      throw new Error("Payment request must be a non-empty string");
    }

    validateNotifyUrl(notifyUrl);

    // Create URL object to handle parameter addition
    const url = new URL(callbackUrl);

    // Add required parameters
    url.searchParams.set("k1", k1);
    url.searchParams.set("pr", paymentRequest);
    url.searchParams.set("balanceNotify", notifyUrl);

    // Check final URL length
    const finalUrl = url.toString();
    if (finalUrl.length > 2000) {
      // Standard URL length limit
      throw new Error("Resulting callback URL would be too long");
    }

    return finalUrl;
  } catch (error) {
    if (error.message.includes("Invalid URL")) {
      throw new Error("Invalid URL format");
    }
    throw error;
  }
};

/**
 * Validates a balance notification URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 * @throws {Error} If URL is invalid
 */
export const validateNotifyUrl = (url) => {
  if (!url || typeof url !== "string") {
    throw new Error("Notification URL must be a non-empty string");
  }

  if (url.length > MAX_NOTIFY_URL_LENGTH) {
    throw new Error(
      `Notification URL must not exceed ${MAX_NOTIFY_URL_LENGTH} characters`,
    );
  }

  try {
    const parsed = new URL(url);

    // Must be HTTP(S)
    if (!parsed.protocol.startsWith("http")) {
      throw new Error("Notification URL must use HTTP(S) protocol");
    }

    // Must not have credentials
    if (parsed.username || parsed.password) {
      throw new Error("Notification URL must not contain credentials");
    }

    return true;
  } catch (error) {
    throw new Error("Invalid notification URL format");
  }
};

/**
 * Extracts balance notification URL from callback parameters
 * @param {URLSearchParams} params - URL search parameters
 * @returns {string|undefined} Balance notification URL if present
 * @throws {Error} If URL is present but invalid
 */
export const extractNotifyUrl = (params) => {
  const notifyUrl = params.get("balanceNotify");
  if (!notifyUrl) {
    return undefined;
  }

  validateNotifyUrl(notifyUrl);
  return notifyUrl;
};

/**
 * Sends a balance notification to a wallet
 * @param {string} notifyUrl - URL to notify
 * @returns {Promise<boolean>} True if notification was sent successfully
 * @throws {Error} If notification fails
 */
export const sendBalanceNotification = async (notifyUrl) => {
  try {
    validateNotifyUrl(notifyUrl);

    const response = await fetch(notifyUrl, {
      method: "POST",
      headers: {
        "User-Agent": "LNURL-Balance-Notify",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return true;
  } catch (error) {
    throw new Error(`Failed to send balance notification: ${error.message}`);
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
  addBalanceNotify,
  validateNotifyUrl,
  extractNotifyUrl,
  sendBalanceNotification,
  createSuccessResponse,
  createErrorResponse,
};
