import { randomBytes } from "crypto";
import { ecdsaVerify } from "secp256k1";

/**
 * Implementation of LUD-04: auth base specification
 * @see https://github.com/lnurl/luds/blob/luds/04.md
 *
 * Flow:
 * 1. LN WALLET scans QR with LNURL containing k1 challenge
 * 2. LN WALLET shows login dialog with domain and action
 * 3. If accepted, wallet signs k1 with linkingPrivKey
 * 4. LN WALLET calls service with signature and public key
 * 5. Service verifies signature and responds with success/error
 */

/**
 * Valid auth action types
 * @readonly
 * @enum {string}
 */
export const AuthAction = {
  REGISTER: "register", // Create new account
  LOGIN: "login", // Login to existing account
  LINK: "link", // Link existing account
  AUTH: "auth", // Stateless authorization
};

/**
 * Creates an auth request URL with required parameters
 * @param {string} baseUrl Base URL of the service (must be HTTPS or onion)
 * @param {string} [action] Optional action type (register|login|link|auth)
 * @returns {{url: string, k1: string} | {status: string, reason: string}}
 */
export const createAuthRequest = (baseUrl, action) => {
  try {
    // Validate URL
    const url = new URL(baseUrl);
    if (
      !(url.protocol === "https:" && !url.hostname.endsWith(".onion")) &&
      !(url.protocol === "http:" && url.hostname.endsWith(".onion"))
    ) {
      return {
        status: "ERROR",
        reason: "Invalid URL: Must be HTTPS clearnet or HTTP onion service",
      };
    }

    // Validate action if provided
    if (action && !Object.values(AuthAction).includes(action)) {
      return {
        status: "ERROR",
        reason: "Invalid action: Must be register, login, link, or auth",
      };
    }

    // Generate random k1 challenge (32 bytes)
    const k1 = randomBytes(32).toString("hex");

    // Build URL with required parameters
    const params = new URLSearchParams({
      tag: "login",
      k1,
    });

    if (action) {
      params.append("action", action);
    }

    // Combine URL parts
    const requestUrl = `${baseUrl}${url.search ? "&" : "?"}${params.toString()}`;

    return {
      url: requestUrl,
      k1,
    };
  } catch (error) {
    return {
      status: "ERROR",
      reason: error.message,
    };
  }
};

/**
 * Generates the callback URL for an auth request
 * @param {string} baseUrl Base URL from the auth request
 * @param {string} k1 The k1 challenge from the auth request
 * @param {string} signature DER-encoded signature of k1 in hex
 * @param {string} publicKey Compressed secp256k1 public key in hex
 * @returns {{url: string} | {status: string, reason: string}}
 */
export const generateAuthCallbackUrl = (baseUrl, k1, signature, publicKey) => {
  try {
    const url = new URL(baseUrl);

    // Preserve existing query parameters
    const params = new URLSearchParams(url.search);

    // Add auth parameters
    params.append("sig", signature);
    params.append("key", publicKey);

    // If k1 isn't in URL, add it
    if (!params.has("k1")) {
      params.append("k1", k1);
    }

    // Combine URL parts
    return {
      url: `${url.origin}${url.pathname}?${params.toString()}`,
    };
  } catch (error) {
    return {
      status: "ERROR",
      reason: `Invalid URL or parameters: ${error.message}`,
    };
  }
};

/**
 * Verifies an auth signature
 * @param {string} k1 32-byte challenge in hex
 * @param {string} signature DER-encoded signature in hex
 * @param {string} publicKey Compressed public key in hex
 * @returns {{isValid: boolean, reason?: string}}
 */
export const verifyAuthSignature = (k1, signature, publicKey) => {
  try {
    // Convert hex strings to Buffers
    const k1Buffer = Buffer.from(k1, "hex");
    const sigBuffer = Buffer.from(signature, "hex");
    const keyBuffer = Buffer.from(publicKey, "hex");

    // Validate input lengths
    if (k1Buffer.length !== 32) {
      return {
        isValid: false,
        reason: "Invalid k1: Must be 32 bytes",
      };
    }

    if (keyBuffer.length !== 33) {
      return {
        isValid: false,
        reason: "Invalid public key: Must be 33 bytes (compressed)",
      };
    }

    // Verify the signature
    const isValid = ecdsaVerify(sigBuffer, k1Buffer, keyBuffer);

    return { isValid };
  } catch (error) {
    return {
      isValid: false,
      reason: error.message,
    };
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
 * @param {string} reason The error reason
 * @returns {{status: string, reason: string}}
 */
export const createErrorResponse = (reason) => ({
  status: "ERROR",
  reason,
});

export default {
  AuthAction,
  createAuthRequest,
  generateAuthCallbackUrl,
  verifyAuthSignature,
  createSuccessResponse,
  createErrorResponse,
};
