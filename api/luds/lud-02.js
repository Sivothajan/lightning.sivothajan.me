/**
 * Implementation of LUD-02 channelRequest base specification
 * @see https://github.com/lnurl/luds/blob/luds/02.md
 *
 * @param {string} uri - Remote node address of form node_key@ip_address:port_number
 * @param {string} callback - a second-level URL which would initiate an OpenChannel message from target LN node
 * @param {string} k1 - Random or non-random string to identify the user's LN WALLET when using the callback URL
 * @returns {{uri: string, callback: string, k1: string, tag: string} | {status: string, reason: string}}
 * @description
 * This function implements the LUD-02 channelRequest specification for initiating incoming Lightning Network channels.
 * Flow:
 * 1. User scans LNURL QR code or accesses lightning:LNURL.. link
 * 2. LN WALLET makes GET request to LN SERVICE using decoded LNURL
 * 3. LN SERVICE responds with channelRequest data
 * 4. LN WALLET opens connection to target node using uri field
 * 5. LN WALLET makes GET request to callback URL with required parameters
 * 6. LN SERVICE responds with success/error
 * 7. LN WALLET awaits incoming OpenChannel message
 */
export const createChannelRequest = (uri, callback, k1) => {
  try {
    // Input validation
    if (
      typeof uri !== "string" ||
      typeof callback !== "string" ||
      typeof k1 !== "string"
    ) {
      return {
        status: "ERROR",
        reason: "Invalid input: uri, callback, and k1 must be strings",
      };
    }

    // URI format validation (node_key@ip_address:port_number)
    if (!uri.includes("@") || !uri.includes(":")) {
      return {
        status: "ERROR",
        reason:
          "Invalid uri format: must be in the form node_key@ip_address:port_number",
      };
    }

    // Callback URL validation
    if (!callback.startsWith("https://") && !callback.startsWith("http://")) {
      return {
        status: "ERROR",
        reason: "Invalid callback URL: must start with 'http://' or 'https://'",
      };
    }

    // k1 validation - ensure it's not empty
    if (k1.trim().length === 0) {
      return {
        status: "ERROR",
        reason: "Invalid k1: must not be empty",
      };
    }

    return {
      uri, // Remote node address of form node_key@ip_address:port_number
      callback, // a second-level URL which would initiate an OpenChannel message from target LN node
      k1, // random or non-random string to identify the user's LN WALLET when using the callback URL
      tag: "channelRequest", // type of LNURL
    };
  } catch (error) {
    return {
      status: "ERROR",
      reason: error.reason || error.message,
    };
  }
};

/**
 * Generate the callback URL with required parameters for channel request
 * @param {string} callbackUrl - Base callback URL from channelRequest
 * @param {string} k1 - The k1 parameter from channelRequest
 * @param {string} remoteId - Local LN node ID
 * @param {boolean} [isPrivate] - Whether the channel should be private
 * @param {boolean} [isCancel] - Whether to cancel the channel request
 * @returns {string} The complete callback URL with parameters
 */
export const generateCallbackUrl = (
  callbackUrl,
  k1,
  remoteId,
  isPrivate,
  isCancel,
) => {
  const url = new URL(callbackUrl);
  const separator = url.search ? "&" : "?";

  let params = `${separator}k1=${encodeURIComponent(k1)}&remoteid=${encodeURIComponent(remoteId)}`;

  if (isCancel) {
    params += "&cancel=1";
  } else if (typeof isPrivate === "boolean") {
    params += `&private=${isPrivate ? "1" : "0"}`;
  }

  return callbackUrl + params;
};

export default {
  createChannelRequest,
  generateCallbackUrl,
};
