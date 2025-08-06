import { createHmac } from "crypto";
import BIP32API from "bip32";
import * as secp256k1 from "secp256k1";

const fromSeed = BIP32API.fromSeed;
const publicKeyCreate = secp256k1.publicKeyCreate;

/**
 * Implementation of LUD-05: BIP32-based seed generation for auth protocol
 * @see https://github.com/lnurl/luds/blob/luds/05.md
 *
 * Key Derivation Flow:
 * 1. Derive hashingKey using m/138'/0
 * 2. Hash service domain with HMAC-SHA256(hashingKey, domain)
 * 3. Take first 16 bytes and convert to 4 uint32 values
 * 4. Derive linkingKey using m/138'/uint1/uint2/uint3/uint4
 */

/**
 * Constants for the derivation path
 * @readonly
 */
export const CONSTANTS = {
  PURPOSE: 138, // LNURL-auth purpose field
  HASHING_INDEX: 0, // Index for hashing key derivation
  PATH_INTEGERS: 4, // Number of integers to derive from hash
  BYTES_PER_INT: 4, // Number of bytes per integer
};

/**
 * Extracts the domain name from a URL as per LUD-05 spec
 * @param {string} url The service URL
 * @returns {{domain: string} | {status: string, reason: string}}
 */
export const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    // Extract FQDN without trailing dot
    const domain = urlObj.hostname.replace(/\.$/, "");

    if (!domain) {
      return {
        status: "ERROR",
        reason: "Invalid URL: Could not extract domain",
      };
    }

    return { domain };
  } catch (error) {
    return {
      status: "ERROR",
      reason: `Invalid URL: ${error.message}`,
    };
  }
};

/**
 * Derives the hashing key from the master key
 * @param {Buffer} masterKey The wallet's master private key
 * @returns {{hashingKey: Buffer} | {status: string, reason: string}}
 */
export const deriveHashingKey = (masterKey) => {
  try {
    const node = fromSeed(masterKey);
    // Derive m/138'/0
    const hashingKey = node
      .deriveHardened(CONSTANTS.PURPOSE)
      .derive(CONSTANTS.HASHING_INDEX);

    return { hashingKey: hashingKey.privateKey };
  } catch (error) {
    return {
      status: "ERROR",
      reason: `Failed to derive hashing key: ${error.message}`,
    };
  }
};

/**
 * Converts bytes to unsigned 32-bit integers
 * @param {Buffer} bytes Buffer containing bytes to convert
 * @returns {number[]} Array of uint32 values
 */
export const bytesToUint32Array = (bytes) => {
  const result = [];
  for (let i = 0; i < bytes.length; i += CONSTANTS.BYTES_PER_INT) {
    result.push(bytes.readUInt32BE(i));
  }
  return result;
};

/**
 * Derives the linking key for a specific domain
 * @param {Buffer} masterKey The wallet's master private key
 * @param {string} domain The service domain name
 * @returns {{linkingKey: {privateKey: Buffer, publicKey: Buffer}} | {status: string, reason: string}}
 */
export const deriveLinkingKey = (masterKey, domain) => {
  try {
    // First derive the hashing key
    const hashingKeyResult = deriveHashingKey(masterKey);
    if (hashingKeyResult.status === "ERROR") {
      return hashingKeyResult;
    }

    // Create HMAC-SHA256 of domain using hashing key
    const hmac = createHmac("sha256", hashingKeyResult.hashingKey);
    const hash = hmac.update(domain).digest();

    // Take first 16 bytes and convert to 4 uint32 values
    const derivationIntegers = bytesToUint32Array(hash.slice(0, 16));

    if (derivationIntegers.length !== CONSTANTS.PATH_INTEGERS) {
      return {
        status: "ERROR",
        reason: "Failed to generate enough derivation integers",
      };
    }

    // Derive the linking key using m/138'/int1/int2/int3/int4
    const node = fromSeed(masterKey);
    const linkingKeyNode = derivationIntegers.reduce(
      (acc, value) => acc.derive(value),
      node.deriveHardened(CONSTANTS.PURPOSE),
    );

    return {
      linkingKey: {
        privateKey: linkingKeyNode.privateKey,
        publicKey: publicKeyCreate(linkingKeyNode.privateKey),
      },
    };
  } catch (error) {
    return {
      status: "ERROR",
      reason: `Failed to derive linking key: ${error.message}`,
    };
  }
};

/**
 * @readonly Test vector for verification
 * @type {{domain: string, hashingPrivKey: string, pathSuffix: number[]}}
 */
export const testVector = {
  domain: "site.com",
  hashingPrivKey:
    "7d417a6a5e9a6a4a879aeaba11a11838764c8fa2b959c242d43dea682b3e409b",
  pathSuffix: [1588488367, 2659270754, 38110259, 4136336762],
};

/**
 * Test vector verification function
 * @param {string} domain The service domain name
 * @param {string} hashingPrivKey The private key used for hashing
 * @param {number[]} pathSuffix The expected path suffix as an array of 4 uint32 values
 * @returns {boolean} True if test vector matches specification
 */
export const verifyVector = (domain, hashingPrivKey, pathSuffix) => {
  if (
    !domain ||
    !hashingPrivKey ||
    !Array.isArray(pathSuffix) ||
    pathSuffix.length !== 4
  ) {
    return false;
  }
  if (typeof domain !== "string" || typeof hashingPrivKey !== "string") {
    return false;
  }
  // Verify path suffix generation
  const hmac = createHmac("sha256", Buffer.from(hashingPrivKey, "hex"));
  const hash = hmac.update(domain).digest();
  const derivationIntegers = bytesToUint32Array(hash.slice(0, 16));

  return derivationIntegers.every(
    (value, index) => value === pathSuffix[index],
  );
};

export default {
  extractDomain,
  deriveHashingKey,
  deriveLinkingKey,
  verifyVector,
  testVector,
};
