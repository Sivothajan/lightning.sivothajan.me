import dotenv from "dotenv";

dotenv.config({ quiet: true });

const hostName = process.env.HOST_NAME || "lightning.sivothajan.me";
const nostrPublicKey =
  process.env.NOSTR_PUBLIC_KEY ||
  "523dbfa6c2ed3a2a405bcac0ec26a1a27fdb597056a13d9360815903ead12b29";
const minSendable = parseInt(process.env.MIN_SENDABLE) || 1000;
const maxSendable = parseInt(process.env.MAX_SENDABLE) || 10000000000;
const isNameMandatory = process.env.IS_NAME_MANDATORY === "true";
const isEmailMandatory = process.env.IS_EMAIL_MANDATORY === "true";
const isPubkeyMandatory = process.env.IS_PUBKEY_MANDATORY === "true";
const allowsNostr = process.env.ALLOWS_NOSTR === "true";
const isEmailIdentifier = process.env.IS_EMAIL_IDENTIFIER === "true";
const isDisposableAddress = process.env.IS_DISPOSABLE_ADDRESS === "true";
const isCommentsAllowed = process.env.IS_COMMENTS_ALLOWED === "true";

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
