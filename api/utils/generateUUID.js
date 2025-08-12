import { v4 } from "uuid";

/**
 * Generates a UUID (Universally Unique Identifier).
 * This function uses the `uuid` library to create a version 4 UUID.
 */
export const generateUUID = () => v4();
