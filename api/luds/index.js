/**
 * Validates a k1 challenge string - lud-07
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

    if (k1.length !== 64) {
      return {
        isValid: false,
        reason: "k1 must be 32 bytes hex encoded (64 hex characters)",
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
