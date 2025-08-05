import lud03 from "./lud-03.js";

/**
 * Implementation of LUD-08: Fast withdrawRequest specification
 * @see https://github.com/lnurl/luds/blob/luds/08.md
 *
 * This is an optimization of LUD-03 that includes withdraw parameters in the initial URL.
 * Note: This is NOT a replacement for standard LNURL-withdraw, and should only be used
 * for lightning: type links between apps, NOT for QR codes.
 */

/**
 * Validates fast withdraw request URL parameters
 * @param {Object} params - URL parameters object
 * @param {string} params.tag - Must be 'withdrawRequest'
 * @param {string} params.k1 - Random or non-random string to identify the user's LN WALLET
 * @param {string} params.callback - URL where LN SERVICE accepts withdrawal Lightning invoice
 * @param {string} params.defaultDescription - Default withdrawal invoice description
 * @param {string|number} params.minWithdrawable - Minimum withdrawable amount in millisatoshis
 * @param {string|number} params.maxWithdrawable - Maximum withdrawable amount in millisatoshis
 * @returns {{isValid: boolean, reason?: string, normalizedParams?: Object}} Validation result
 */
export const validateFastWithdrawParams = (params) => {
  try {
    // Check all required parameters are present
    const requiredParams = [
      "tag",
      "k1",
      "callback",
      "defaultDescription",
      "minWithdrawable",
      "maxWithdrawable",
    ];
    const missingParams = requiredParams.filter((param) => !(param in params));

    if (missingParams.length > 0) {
      return {
        isValid: false,
        reason: `Missing required parameters: ${missingParams.join(", ")}`,
      };
    }

    // Validate tag
    if (params.tag !== "withdrawRequest") {
      return {
        isValid: false,
        reason: "Tag must be 'withdrawRequest'",
      };
    }

    // Convert amount parameters to integers
    const minWithdrawable = parseInt(params.minWithdrawable, 10);
    const maxWithdrawable = parseInt(params.maxWithdrawable, 10);

    if (isNaN(minWithdrawable) || isNaN(maxWithdrawable)) {
      return {
        isValid: false,
        reason: "Withdrawable amounts must be valid integers",
      };
    }

    // Return normalized parameters for easy usage
    return {
      isValid: true,
      normalizedParams: {
        tag: params.tag,
        k1: params.k1,
        callback: params.callback,
        defaultDescription: params.defaultDescription,
        minWithdrawable,
        maxWithdrawable,
      },
    };
  } catch (error) {
    return {
      isValid: false,
      reason: `Parameter validation error: ${error.message}`,
    };
  }
};

/**
 * Creates a fast withdraw request URL with embedded parameters
 * @param {string} baseUrl - Base service URL before parameters
 * @param {string} k1 - Random string to identify user's LN WALLET
 * @param {number} minWithdrawable - Minimum withdrawable amount in millisatoshis
 * @param {number} maxWithdrawable - Maximum withdrawable amount in millisatoshis
 * @param {string} defaultDescription - Default withdrawal invoice description
 * @param {string} callback - URL where LN SERVICE accepts withdrawal Lightning invoice
 * @returns {{url: string} | {status: string, reason: string}} The complete fast withdraw URL or error
 */
export const createFastWithdrawUrl = (
  baseUrl,
  k1,
  minWithdrawable,
  maxWithdrawable,
  defaultDescription,
  callback,
) => {
  try {
    // Validate base URL
    try {
      new URL(baseUrl);
    } catch (error) {
      return {
        status: "ERROR",
        reason: "Invalid base URL",
      };
    }

    // Create URL with parameters
    const url = new URL(baseUrl);
    const params = new URLSearchParams({
      tag: "withdrawRequest",
      k1,
      minWithdrawable: minWithdrawable.toString(),
      maxWithdrawable: maxWithdrawable.toString(),
      defaultDescription,
      callback,
    });

    // Append parameters to URL
    url.search = url.search
      ? `${url.search}&${params.toString()}`
      : `?${params.toString()}`;

    return { url: url.toString() };
  } catch (error) {
    return {
      status: "ERROR",
      reason: error.message,
    };
  }
};

/**
 * Handles a fast withdraw request by extracting parameters and creating a standard withdraw response
 * @param {URL} url - The parsed URL containing fast withdraw parameters
 * @returns {Object} Standard LUD-03 withdraw request response or error
 */
export const handleFastWithdrawRequest = (url) => {
  try {
    // Extract parameters from URL
    const params = Object.fromEntries(url.searchParams);

    // Validate parameters
    const validation = validateFastWithdrawParams(params);
    if (!validation.isValid) {
      return {
        status: "ERROR",
        reason: validation.reason,
      };
    }

    // Use normalized parameters to create standard withdraw request
    const { normalizedParams } = validation;
    return lud03.createWithdrawRequest(
      normalizedParams.callback,
      normalizedParams.k1,
      normalizedParams.defaultDescription,
      normalizedParams.minWithdrawable,
      normalizedParams.maxWithdrawable,
    );
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
  validateFastWithdrawParams,
  createFastWithdrawUrl,
  handleFastWithdrawRequest,
  createSuccessResponse,
  createErrorResponse,
};
