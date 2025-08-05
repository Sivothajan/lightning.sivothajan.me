import dotenv from "dotenv";

dotenv.config({ quiet: true });

/**
 * @constant {string} hostName - The hostname for the application
 * @type {string}
 * @description This is used to construct URLs and should be set in your .env file.
 */
const hostName = process.env.HOST_NAME || "lightning.sivothajan.me";

/**
 * @constant {string} nostrPublicKey - The public key for Nostr integration
 * @type {string}
 * @description This key is used for Nostr-related functionalities and should be set in your .env file.
 */
const nostrPublicKey =
  process.env.NOSTR_PUBLIC_KEY ||
  "523dbfa6c2ed3a2a405bcac0ec26a1a27fdb597056a13d9360815903ead12b29";

/**
 * @constant {number} minSendable - The minimum amount that can be sent in millisatoshis
 * @type {number}
 * @description This value is used to validate the minimum sendable amount and should be set in your .env file.
 */
const minSendable = parseInt(process.env.MIN_SENDABLE) || 1000;

/**
 * @constant {number} maxSendable - The maximum amount that can be sent in millisatoshis
 * @type {number}
 * @description This value is used to validate the maximum sendable amount and should be set in your .env file.
 */
const maxSendable = parseInt(process.env.MAX_SENDABLE) || 10000000000;

/**
 * @constant {boolean} isNameMandatory - Whether the name field is mandatory
 * @type {boolean}
 * @description This flag indicates if the name field is required in requests.
 */
const isNameMandatory = process.env.IS_NAME_MANDATORY === "true";

/**
 * @constant {boolean} isEmailMandatory - Whether the email field is mandatory
 * @type {boolean}
 * @description This flag indicates if the email field is required in requests.
 */
const isEmailMandatory = process.env.IS_EMAIL_MANDATORY === "true";

/**
 * @constant {boolean} isPubkeyMandatory - Whether the public key field is mandatory
 * @type {boolean}
 * @description This flag indicates if the public key field is required in requests.
 */
const isPubkeyMandatory = process.env.IS_PUBKEY_MANDATORY === "true";

/**
 * @constant {boolean} allowsNostr - Whether Nostr integration is allowed
 * @type {boolean}
 * @description This flag indicates if Nostr-related functionalities are enabled.
 */
const allowsNostr = process.env.ALLOWS_NOSTR === "true";

/**
 * @constant {boolean} isEmailIdentifier - Whether email is used as an identifier
 * @type {boolean}
 * @description This flag indicates if the email field is used as a unique identifier in requests.
 */
const isEmailIdentifier = process.env.IS_EMAIL_IDENTIFIER === "true";

/**
 * @constant {boolean} isDisposableAddress - Whether disposable lnurlp addresses are allowed
 * @type {boolean}
 * @description This flag indicates if disposable lnurlp addresses are permitted in requests.
 */
const isDisposableAddress = process.env.IS_DISPOSABLE_ADDRESS === "true";

/**
 * @constant {boolean} isCommentsAllowed - Whether comments are allowed in requests
 * @type {boolean}
 * @description This flag indicates if comments are permitted in requests.
 */
const isCommentsAllowed = process.env.IS_COMMENTS_ALLOWED === "true";

/**
 * @constant {boolean} isMessageInSuccessAction - Whether a message is included in the success action
 * @type {boolean}
 * @description This flag indicates if a message should be included in the success action response.
 */
const isMessageInSuccessAction =
  process.env.IS_MESSAGE_IN_SUCCESS_ACTION === "true";

export {
  hostName,
  nostrPublicKey,
  minSendable,
  maxSendable,
  isNameMandatory,
  isEmailMandatory,
  isPubkeyMandatory,
  allowsNostr,
  isEmailIdentifier,
  isDisposableAddress,
  isCommentsAllowed,
  isMessageInSuccessAction,
};

if (!hostName || !nostrPublicKey) {
  console.error("Host name or Nostr public key is missing!");
  process.exit(1);
}

if (isNaN(minSendable) || isNaN(maxSendable)) {
  console.error("Min or Max sendable amounts are not valid numbers!");
  process.exit(1);
}

if (minSendable <= 0 || maxSendable <= 0) {
  console.error("Min or Max sendable amounts must be greater than zero!");
  process.exit(1);
}

if (minSendable >= maxSendable) {
  console.error("Min sendable amount must be less than Max sendable amount!");
  process.exit(1);
}
