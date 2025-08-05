/**
 * Implementation of LUD-09: successAction field for payRequest
 * @see https://github.com/lnurl/luds/blob/luds/09.md
 */

/**
 * Maximum length for message and description fields
 * @constant {number}
 */
export const MAX_MESSAGE_LENGTH = 144;

/**
 * Supported successAction tag types
 * @readonly
 * @enum {string}
 */
export const SuccessActionType = {
  MESSAGE: "message",
  URL: "url",
};

/**
 * Creates a success action object with a message.
 *
 * @param {string} message - Message of the action, up to 144 characters.
 * @returns {{tag: string, message: string}} Success action object with tag and message.
 * @throws {Error} If any parameter does not meet the specified criteria:
 *   - message is not a string or exceeds 144 characters
 */
export const successAction_message = (message) => {
  if (typeof message !== "string") {
    throw new Error("Message must be a string");
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Message must be up to ${MAX_MESSAGE_LENGTH} characters`);
  }
  return {
    tag: SuccessActionType.MESSAGE,
    message,
  };
};

/**
 * Creates a success action object with a url.
 *
 * @param {string} description - Description of the action, up to 144 characters.
 * @param {string} url - URL of the action, the domain must be matching the `callbackDomain`.
 * @param {string} callbackDomain - Domain of the callback URL, must match the domain of the `url`.
 * @returns {{tag: string, description: string, url: string}} Success action object with tag, description and url.
 * @throws {Error} If any parameter does not meet the specified criteria:
 *   - description is not a string or exceeds 144 characters
 *   - url is not a string
 *   - url domain must be the same as `callback` domain
 */
export const successAction_url = (description, url, callbackDomain) => {
  if (typeof description !== "string") {
    throw new Error("Description must be a string");
  }
  if (description.length > MAX_MESSAGE_LENGTH) {
    throw new Error(
      `Description must be up to ${MAX_MESSAGE_LENGTH} characters`,
    );
  }
  if (typeof url !== "string") {
    throw new Error("URL must be a string");
  }
  if (typeof callbackDomain !== "string") {
    throw new Error("Callback domain must be a string");
  }
  const urlDomain = new URL(url).hostname;
  if (urlDomain !== callbackDomain) {
    throw new Error("URL domain must match the callback domain");
  }
  return {
    tag: SuccessActionType.URL,
    description,
    url,
  };
};

/**
 * Validates a success action object against the LUD-09 spec
 * @param {Object} successAction - The success action to validate
 * @param {string} callbackDomain - Domain from the callback URL for URL validation
 * @returns {boolean} True if the success action is valid
 * @throws {Error} If the success action is invalid with detailed reason
 */
export const validateSuccessAction = (successAction, callbackDomain) => {
  if (!successAction || typeof successAction !== "object") {
    throw new Error("Success action must be an object");
  }

  if (!successAction.tag) {
    throw new Error("Success action must have a tag field");
  }

  switch (successAction.tag) {
    case SuccessActionType.MESSAGE:
      if (typeof successAction.message !== "string") {
        throw new Error("Message must be a string");
      }
      if (successAction.message.length > MAX_MESSAGE_LENGTH) {
        throw new Error(
          `Message must be up to ${MAX_MESSAGE_LENGTH} characters`,
        );
      }
      break;

    case SuccessActionType.URL:
      if (typeof successAction.description !== "string") {
        throw new Error("Description must be a string");
      }
      if (successAction.description.length > MAX_MESSAGE_LENGTH) {
        throw new Error(
          `Description must be up to ${MAX_MESSAGE_LENGTH} characters`,
        );
      }
      if (typeof successAction.url !== "string") {
        throw new Error("URL must be a string");
      }
      const urlDomain = new URL(successAction.url).hostname;
      if (urlDomain !== callbackDomain) {
        throw new Error("URL domain must match the callback domain");
      }
      break;

    default:
      throw new Error(`Unsupported success action type: ${successAction.tag}`);
  }

  return true;
};

/**
 * Creates a payment response object with success action
 * @param {string} pr - The BOLT11 payment request
 * @param {Object} [successAction] - Optional success action object
 * @param {string} [callbackDomain] - Required if successAction is URL type
 * @returns {{pr: string, routes: Array, successAction?: Object}}
 * @throws {Error} If pr is missing or successAction is invalid
 */
export const createPaymentResponse = (pr, successAction, callbackDomain) => {
  if (!pr) {
    throw new Error("Payment request is required");
  }

  const response = {
    pr,
    routes: [],
  };

  if (successAction) {
    validateSuccessAction(successAction, callbackDomain);
    response.successAction = successAction;
  }

  return response;
};

export default {
  MAX_MESSAGE_LENGTH,
  SuccessActionType,
  successAction_message,
  successAction_url,
  validateSuccessAction,
  createPaymentResponse,
};
