// LUD-01
import {
  encodeLNURL,
  decodeLNURL,
  isValidLNURL,
  extractLNURLFromFallback,
} from "./lud-01.js";

// LUD-02
import { createChannelRequest, generateCallbackUrl } from "./lud-02.js";

// LUD-03
import {
  createWithdrawRequest as createWithdrawRequest_03,
  generateWithdrawCallbackUrl,
  validateWithdrawAmount,
  createErrorResponse,
  createSuccessResponse,
} from "./lud-03.js";

// LUD-04
import {
  AuthAction,
  createAuthRequest,
  generateAuthCallbackUrl,
  verifyAuthSignature,
} from "./lud-04.js";

// LUD-05
import { extractDomain, verifyVector, testVector } from "./lud-05.js";

// LUD-06
import {
  createPayRequest,
  validateMetadata as validateMetadata_06,
  generatePaymentCallbackUrl,
  validatePaymentAmount,
  verifyInvoice,
} from "./lud-06.js";

// LUD-07
import {
  createHostedChannelRequest,
  validateNodeUri,
  validateK1,
} from "./lud-07.js";

// LUD-08
import {
  validateFastWithdrawParams,
  createFastWithdrawUrl,
  handleFastWithdrawRequest,
} from "./lud-08.js";

// LUD-09
import {
  MAX_MESSAGE_LENGTH,
  SuccessActionType,
  successAction_message,
  successAction_url,
  validateSuccessAction,
} from "./lud-09.js";

// LUD-10
import {
  validateAesAction,
  successAction_aes,
  aes_encrypt,
  aes_decrypt,
} from "./lud-10.js";

// LUD-11
import { isDisposable, validatePaymentResponse } from "./lud-11.js";

// LUD-12
import {
  addCommentSupport,
  validateComment,
  addCommentToCallback,
  extractComment,
} from "./lud-12.js";

// LUD-13 (keeps deriveHashingKey, deriveLinkingKey, getSigningMessage, deriveKeys, validateSignature)
import {
  deriveHashingKey,
  deriveLinkingKey,
  getSigningMessage,
  deriveKeys,
  validateSignature,
} from "./lud-13.js";

// LUD-14 (keeps createWithdrawRequest, validateBalanceCheckUrl, getBalance, updateBalanceCheckUrl)
import {
  createWithdrawRequest as createWithdrawRequest_14,
  validateBalanceCheckUrl,
  getBalance,
  updateBalanceCheckUrl,
} from "./lud-14.js";

// LUD-15
import {
  addBalanceNotify,
  validateNotifyUrl,
  extractNotifyUrl,
  sendBalanceNotification,
} from "./lud-15.js";

// LUD-16
import {
  parseLightningAddress,
  getLnurlpEndpoint,
  createAddressMetadata,
  validateLightningAddress,
  extractAddressMetadata,
} from "./lud-16.js";

// LUD-17
import {
  LnurlProtocol,
  isLnurlProtocol,
  getLnurlProtocolInfo,
  convertToHttpUrl,
  createLnurlProtocolUrl,
  validateProtocolUrl,
} from "./lud-17.js";

// LUD-18
import {
  PayerDataField,
  createPayerDataRequest,
  createPayerData,
  validatePayerData,
  calculateMetadataHash,
} from "./lud-18.js";

// LUD-19 (keeps validatePayLink, createWithdrawRequest, getServiceCapabilities, createUnifiedServiceEntry)
import {
  validatePayLink,
  createWithdrawRequest as createWithdrawRequest_19,
  getServiceCapabilities,
  createUnifiedServiceEntry,
} from "./lud-19.js";

// LUD-20 (keeps MetadataType, createMetadata, extractDescriptions, getDisplayDescription, validateMetadata)
import {
  MetadataType,
  createMetadata,
  extractDescriptions,
  getDisplayDescription,
  validateMetadata as validateMetadata_20,
} from "./lud-20.js";

// LUD-21
import {
  Status,
  createCallbackResponse,
  createPaidVerifyResponse,
  createUnpaidVerifyResponse,
  createVerifyErrorResponse,
  validateVerifyResponse,
  processVerifyResponse,
  createVerifyUrl,
} from "./lud-21.js";

// ----
// Now, for all functions imported from multiple LUDs, only the highest-numbered LUD's import is used.
// That means for:
// - createWithdrawRequest: use from LUD-19
// - validateMetadata: use from LUD-20
// - deriveHashingKey, deriveLinkingKey: use from LUD-13

export {
  // LUD-01
  encodeLNURL,
  decodeLNURL,
  isValidLNURL,
  extractLNURLFromFallback,
  // LUD-02
  createChannelRequest,
  generateCallbackUrl,
  // LUD-03
  generateWithdrawCallbackUrl,
  validateWithdrawAmount,
  createErrorResponse,
  createSuccessResponse,
  // LUD-04
  AuthAction,
  createAuthRequest,
  generateAuthCallbackUrl,
  verifyAuthSignature,
  // LUD-05
  extractDomain,
  verifyVector,
  testVector,
  // LUD-06
  createPayRequest,
  generatePaymentCallbackUrl,
  validatePaymentAmount,
  verifyInvoice,
  // LUD-07
  createHostedChannelRequest,
  validateNodeUri,
  validateK1,
  // LUD-08
  createFastWithdrawUrl,
  handleFastWithdrawRequest,
  validateFastWithdrawParams,
  // LUD-09
  MAX_MESSAGE_LENGTH,
  SuccessActionType,
  successAction_message,
  successAction_url,
  validateSuccessAction,
  // LUD-10
  validateAesAction,
  successAction_aes,
  aes_encrypt,
  aes_decrypt,
  // LUD-11
  isDisposable,
  validatePaymentResponse,
  // LUD-12
  addCommentSupport,
  validateComment,
  addCommentToCallback,
  extractComment,
  // LUD-13
  deriveHashingKey,
  deriveLinkingKey,
  getSigningMessage,
  deriveKeys,
  validateSignature,
  // LUD-14
  validateBalanceCheckUrl,
  getBalance,
  updateBalanceCheckUrl,
  // LUD-15
  addBalanceNotify,
  validateNotifyUrl,
  extractNotifyUrl,
  sendBalanceNotification,
  // LUD-16
  parseLightningAddress,
  getLnurlpEndpoint,
  createAddressMetadata,
  validateLightningAddress,
  extractAddressMetadata,
  // LUD-17
  LnurlProtocol,
  isLnurlProtocol,
  getLnurlProtocolInfo,
  convertToHttpUrl,
  createLnurlProtocolUrl,
  validateProtocolUrl,
  // LUD-18
  PayerDataField,
  createPayerDataRequest,
  createPayerData,
  validatePayerData,
  calculateMetadataHash,
  // LUD-19
  validatePayLink,
  createWithdrawRequest_19 as createWithdrawRequest,
  getServiceCapabilities,
  createUnifiedServiceEntry,
  // LUD-20
  MetadataType,
  createMetadata,
  extractDescriptions,
  getDisplayDescription,
  validateMetadata_20 as validateMetadata,
  // LUD-21
  Status,
  createCallbackResponse,
  createPaidVerifyResponse,
  createUnpaidVerifyResponse,
  createVerifyErrorResponse,
  validateVerifyResponse,
  processVerifyResponse,
  createVerifyUrl,
};

export default {
  encodeLNURL,
  decodeLNURL,
  isValidLNURL,
  extractLNURLFromFallback,
  createChannelRequest,
  generateCallbackUrl,
  generateWithdrawCallbackUrl,
  validateWithdrawAmount,
  createErrorResponse,
  createSuccessResponse,
  AuthAction,
  createAuthRequest,
  generateAuthCallbackUrl,
  verifyAuthSignature,
  extractDomain,
  verifyVector,
  testVector,
  createPayRequest,
  generatePaymentCallbackUrl,
  validatePaymentAmount,
  verifyInvoice,
  createHostedChannelRequest,
  validateNodeUri,
  validateK1,
  createFastWithdrawUrl,
  handleFastWithdrawRequest,
  validateFastWithdrawParams,
  MAX_MESSAGE_LENGTH,
  SuccessActionType,
  successAction_message,
  successAction_url,
  validateSuccessAction,
  validateAesAction,
  successAction_aes,
  aes_encrypt,
  aes_decrypt,
  isDisposable,
  validatePaymentResponse,
  addCommentSupport,
  validateComment,
  addCommentToCallback,
  extractComment,
  deriveHashingKey,
  deriveLinkingKey,
  getSigningMessage,
  deriveKeys,
  validateSignature,
  validateBalanceCheckUrl,
  getBalance,
  updateBalanceCheckUrl,
  addBalanceNotify,
  validateNotifyUrl,
  extractNotifyUrl,
  sendBalanceNotification,
  parseLightningAddress,
  getLnurlpEndpoint,
  createAddressMetadata,
  validateLightningAddress,
  extractAddressMetadata,
  LnurlProtocol,
  isLnurlProtocol,
  getLnurlProtocolInfo,
  convertToHttpUrl,
  createLnurlProtocolUrl,
  validateProtocolUrl,
  PayerDataField,
  createPayerDataRequest,
  createPayerData,
  validatePayerData,
  calculateMetadataHash,
  validatePayLink,
  createWithdrawRequest: createWithdrawRequest_19,
  getServiceCapabilities,
  createUnifiedServiceEntry,
  MetadataType,
  createMetadata,
  extractDescriptions,
  getDisplayDescription,
  validateMetadata: validateMetadata_20,
  Status,
  createCallbackResponse,
  createPaidVerifyResponse,
  createUnpaidVerifyResponse,
  createVerifyErrorResponse,
  validateVerifyResponse,
  processVerifyResponse,
  createVerifyUrl,
};
