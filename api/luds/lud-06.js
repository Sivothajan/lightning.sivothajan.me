import { createHash } from "crypto";

/**
 * Implementation of LUD-06: payRequest base specification
 * @see https://github.com/lnurl/luds/blob/luds/06.md
 *
 * Wallet to service interaction flow:
 * 1. User scans LNURL QR code or accesses lightning:LNURL link
 * 2. LN WALLET makes GET request to LN SERVICE using decoded LNURL
 * 3. LN SERVICE returns payRequest data (callback URL, metadata, amounts)
 * 4. LN WALLET displays payment dialog with amount selection
 * 5. User confirms, LN WALLET calls callback with amount
 * 6. LN SERVICE returns BOLT11 invoice
 * 7. LN WALLET verifies invoice and pays it
 */

/**
 * Validates metadata array structure according to LUD-06 spec
 * @param {Array} metadata - Array of metadata entries
 * @returns {{isValid: boolean, reason?: string}} Validation result
 */
export const validateMetadata = (metadata) => {
  try {
    // Metadata must be an array
    if (!Array.isArray(metadata)) {
      return {
        isValid: false,
        reason: "Metadata must be an array",
      };
    }

    // Must contain at least one text/plain entry
    const hasTextPlain = metadata.some(
      (entry) =>
        Array.isArray(entry) &&
        entry.length >= 2 &&
        entry[0] === "text/plain" &&
        typeof entry[1] === "string",
    );

    if (!hasTextPlain) {
      return {
        isValid: false,
        reason: "Metadata must contain one text/plain entry",
      };
    }

    // Check for image entries
    let hasJpeg = false;
    let hasPng = false;

    for (const entry of metadata) {
      if (!Array.isArray(entry) || entry.length < 2) {
        return {
          isValid: false,
          reason: "Each metadata entry must be an array with at least 2 items",
        };
      }

      const [type] = entry;

      // Validate image entries
      if (type === "image/png;base64" || type === "image/jpeg;base64") {
        if (type === "image/png;base64" && hasPng) {
          return {
            isValid: false,
            reason: "Multiple PNG images are not allowed",
          };
        }
        if (type === "image/jpeg;base64" && hasJpeg) {
          return {
            isValid: false,
            reason: "Multiple JPEG images are not allowed",
          };
        }

        // Check image size
        const base64Data = entry[1];
        if (typeof base64Data !== "string" || base64Data.length > 136536) {
          return {
            isValid: false,
            reason: "Image data must be a base64 string <= 136536 characters",
          };
        }

        if (type === "image/png;base64") hasPng = true;
        if (type === "image/jpeg;base64") hasJpeg = true;
      }
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      reason: `Metadata validation error: ${error.message}`,
    };
  }
};

/**
 * Creates a pay request response object as per LUD-06 spec
 * @param {string} callback - URL where LN SERVICE accepts payment parameters
 * @param {number} minSendable - Min millisatoshi amount service will accept
 * @param {number} maxSendable - Max millisatoshi amount service will accept
 * @param {Array} metadata - Metadata array with description and optional image
 * @returns {{callback: string, maxSendable: number, minSendable: number, metadata: string, tag: string} | {status: string, reason: string}}
 */
export const createPayRequest = (
  callback,
  minSendable,
  maxSendable,
  metadata,
) => {
  try {
    // Input validation
    if (typeof callback !== "string" || !callback.trim()) {
      return {
        status: "ERROR",
        reason: "Invalid callback URL: Must be a non-empty string",
      };
    }

    try {
      const url = new URL(callback);
      if (
        !(url.protocol === "https:" && !url.hostname.endsWith(".onion")) &&
        !(url.protocol === "http:" && url.hostname.endsWith(".onion"))
      ) {
        return {
          status: "ERROR",
          reason:
            "Invalid callback URL: Must be HTTPS clearnet or HTTP onion service",
        };
      }
    } catch (error) {
      return {
        status: "ERROR",
        reason: "Invalid callback URL: Must be a valid HTTP(S) URL",
      };
    }

    if (!Number.isInteger(minSendable) || minSendable < 1) {
      return {
        status: "ERROR",
        reason: "Invalid minSendable: Must be a positive integer",
      };
    }

    if (!Number.isInteger(maxSendable) || maxSendable < minSendable) {
      return {
        status: "ERROR",
        reason: "Invalid maxSendable: Must be >= minSendable",
      };
    }

    // Validate metadata structure
    const metadataValidation = validateMetadata(metadata);
    if (!metadataValidation.isValid) {
      return {
        status: "ERROR",
        reason: metadataValidation.reason,
      };
    }

    // Convert metadata to string for response
    const metadataString = JSON.stringify(metadata);

    return {
      tag: "payRequest",
      callback,
      maxSendable,
      minSendable,
      metadata: metadataString,
    };
  } catch (error) {
    return {
      status: "ERROR",
      reason: error.message,
    };
  }
};

/**
 * Generates the callback URL for a payment request
 * @param {string} callback - Base callback URL from payRequest
 * @param {number} amount - Amount in millisatoshis
 * @returns {{url: string} | {status: string, reason: string}}
 */
export const generatePaymentCallbackUrl = (callback, amount) => {
  try {
    if (!callback || !amount) {
      return {
        status: "ERROR",
        reason: "Missing required parameters: callback or amount",
      };
    }

    const url = new URL(callback);
    const separator = url.search ? "&" : "?";

    return {
      url: `${callback}${separator}amount=${amount}`,
    };
  } catch (error) {
    return {
      status: "ERROR",
      reason: `Invalid URL or parameters: ${error.message}`,
    };
  }
};

/**
 * Validates if a payment amount is within the allowed bounds
 * @param {number} amount - Amount to validate in millisatoshis
 * @param {number} minSendable - Minimum allowed payment amount
 * @param {number} maxSendable - Maximum allowed payment amount
 * @param {number} [maxRoutable] - Optional local estimation of maximum routable amount
 * @returns {{isValid: boolean, effectiveMin: number, effectiveMax: number, reason?: string}}
 */
export const validatePaymentAmount = (
  amount,
  minSendable,
  maxSendable,
  maxRoutable,
) => {
  // Calculate effective bounds
  const effectiveMax = maxRoutable
    ? Math.min(maxSendable, maxRoutable)
    : maxSendable;
  const effectiveMin = minSendable;

  if (!Number.isInteger(amount)) {
    return {
      isValid: false,
      effectiveMin,
      effectiveMax,
      reason: "Amount must be an integer",
    };
  }

  if (amount < effectiveMin) {
    return {
      isValid: false,
      effectiveMin,
      effectiveMax,
      reason: `Amount below minimum: ${effectiveMin} msats`,
    };
  }

  if (amount > effectiveMax) {
    return {
      isValid: false,
      effectiveMin,
      effectiveMax,
      reason: `Amount above maximum: ${effectiveMax} msats`,
    };
  }

  return {
    isValid: true,
    effectiveMin,
    effectiveMax,
  };
};

/**
 * Verifies that an invoice matches the expected parameters
 * @param {string} invoice - BOLT-11 invoice to verify
 * @param {string} metadata - Original metadata string
 * @param {number} amount - Expected amount in millisatoshis
 * @returns {{isValid: boolean, reason?: string}} Verification result
 */
export const verifyInvoice = (invoice, metadata, amount) => {
  try {
    // Convert metadata string to UTF-8 bytes and calculate SHA256
    const metadataBytes = Buffer.from(metadata, "utf8");
    const metadataHash = createHash("sha256")
      .update(metadataBytes)
      .digest("hex");

    // TODO: Parse BOLT-11 invoice and verify:
    // 1. The h tag (description_hash) matches metadataHash
    // 2. The amount matches exactly
    // Note: This requires a BOLT-11 invoice parsing library

    return {
      isValid: true,
    };
  } catch (error) {
    return {
      isValid: false,
      reason: `Invoice verification failed: ${error.message}`,
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
  createPayRequest,
  validateMetadata,
  generatePaymentCallbackUrl,
  validatePaymentAmount,
  verifyInvoice,
  createSuccessResponse,
  createErrorResponse,
};
