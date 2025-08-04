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
  if (message.length > 144) {
    throw new Error("Message must be up to 144 characters");
  }
  return {
    tag: "message",
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
    throw new Error("Message must be a string");
  }
  if (description.length > 144) {
    throw new Error("Message must be up to 144 characters");
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
    tag: "url",
    description,
    url,
  };
};
