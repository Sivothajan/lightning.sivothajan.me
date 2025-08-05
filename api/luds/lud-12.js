/**
 * Implementation of LUD-12: comments in payRequest
 * @see https://github.com/lnurl/luds/blob/luds/12.md
 *
 * This spec adds support for allowing users to add comments to their
 * payments, with services specifying the maximum allowed comment length.
 */

/**
 * Maximum practical URL length (conservative estimate)
 * @constant {number}
 */
const MAX_URL_LENGTH = 2000;

/**
 * Reserved URL characters that need escaping in comments
 * @constant {RegExp}
 */
const RESERVED_URL_CHARS = /[!'()*]/g;

/**
 * Adds comment support to a pay request response
 * @param {Object} payRequest - Base pay request response from LUD-06
 * @param {number} commentAllowed - Maximum number of characters allowed in comments
 * @returns {Object} Enhanced pay request with comment support
 * @throws {Error} If inputs are invalid
 */
export const addCommentSupport = (payRequest, commentAllowed) => {
  // Validate base pay request
  if (!payRequest || typeof payRequest !== "object") {
    throw new Error("Pay request must be an object");
  }

  if (!payRequest.callback || typeof payRequest.callback !== "string") {
    throw new Error("Pay request must have a valid callback URL");
  }

  // Validate comment length
  if (typeof commentAllowed !== "number" || !Number.isInteger(commentAllowed)) {
    throw new Error("Comment allowed length must be an integer");
  }

  if (commentAllowed < 0) {
    throw new Error("Comment allowed length must be non-negative");
  }

  // Only add commentAllowed if greater than 0
  if (commentAllowed > 0) {
    return {
      ...payRequest,
      commentAllowed,
    };
  }

  return payRequest;
};

/**
 * Validates a user comment against service requirements
 * @param {string} comment - User provided comment
 * @param {number} maxLength - Maximum allowed comment length
 * @returns {boolean} True if comment is valid
 * @throws {Error} If comment is invalid
 */
export const validateComment = (comment, maxLength) => {
  if (typeof comment !== "string") {
    throw new Error("Comment must be a string");
  }

  if (comment.length > maxLength) {
    throw new Error(`Comment must not exceed ${maxLength} characters`);
  }

  return true;
};

/**
 * Adds a comment to a callback URL
 * @param {string} callbackUrl - Base callback URL
 * @param {number} amount - Payment amount in millisatoshis
 * @param {string} comment - User comment to add
 * @param {number} maxLength - Maximum allowed comment length
 * @returns {string} Callback URL with comment
 * @throws {Error} If inputs are invalid or resulting URL would be too long
 */
export const addCommentToCallback = (
  callbackUrl,
  amount,
  comment,
  maxLength,
) => {
  try {
    // Validate inputs
    if (!callbackUrl || typeof callbackUrl !== "string") {
      throw new Error("Callback URL must be a non-empty string");
    }

    if (typeof amount !== "number" || !Number.isInteger(amount) || amount < 0) {
      throw new Error("Amount must be a non-negative integer");
    }

    // Validate comment
    validateComment(comment, maxLength);

    // Create URL object to handle proper parameter addition
    const url = new URL(callbackUrl);

    // Add amount parameter
    url.searchParams.set("amount", amount.toString());

    // Properly encode and add comment
    // Note: encodeURIComponent doesn't encode !'()*
    // These need to be manually encoded as per RFC 3986
    const encodedComment = encodeURIComponent(comment).replace(
      RESERVED_URL_CHARS,
      (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase(),
    );

    url.searchParams.set("comment", encodedComment);

    // Check final URL length
    const finalUrl = url.toString();
    if (finalUrl.length > MAX_URL_LENGTH) {
      throw new Error("Resulting URL would exceed maximum allowed length");
    }

    return finalUrl;
  } catch (error) {
    if (error.message.includes("Invalid URL")) {
      throw new Error("Invalid callback URL format");
    }
    throw error;
  }
};

/**
 * Extracts and validates a comment from callback parameters
 * @param {URLSearchParams} params - URL search parameters
 * @param {number} maxLength - Maximum allowed comment length
 * @returns {string|undefined} Validated comment or undefined if not present
 * @throws {Error} If comment is present but invalid
 */
export const extractComment = (params, maxLength) => {
  const comment = params.get("comment");
  if (!comment) {
    return undefined;
  }

  validateComment(comment, maxLength);
  return comment;
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
  addCommentSupport,
  validateComment,
  addCommentToCallback,
  extractComment,
  createSuccessResponse,
  createErrorResponse,
};
