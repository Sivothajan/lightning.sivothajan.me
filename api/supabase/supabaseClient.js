import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

/**
 * @constant {string} supabaseUrl - The URL of the Supabase instance
 * @type {string}
 */
const supabaseUrl = process.env.SUPABASE_URL;

/**
 * @constant {string} supabasePublicAnonKey - The public anonymous key for Supabase
 * @type {string}
 * @description This key is used to authenticate requests to the Supabase instance.
 * Make sure to set the environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.
 */
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * @const {string} supabaseTable - The name of the Supabase table to use
 * @type {string}
 * @description This table is used to store deposit details for the wallet.
 * It should be defined in your Supabase project.
 * Make sure to set the environment variable SUPABASE_TABLE in your .env file.
 */
export const supabaseTable = process.env.SUPABASE_TABLE;

/** * Creates a Supabase client instance
 * @returns {object} The Supabase client
 */
export const supabase = createClient(supabaseUrl, supabasePublicAnonKey);

if (!supabaseUrl || !supabasePublicAnonKey) {
  console.error("Supabase URL or Public Anon Key is missing!");
  process.exit(1);
}

if (!supabaseTable) {
  console.error("Supabase table name is not defined!");
  process.exit(1);
}
