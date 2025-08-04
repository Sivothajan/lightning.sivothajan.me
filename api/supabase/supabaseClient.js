import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseTable = process.env.SUPABASE_TABLE;

export const supabase = createClient(supabaseUrl, supabasePublicAnonKey);

if (!supabaseUrl || !supabasePublicAnonKey) {
  console.error("Supabase URL or Public Anon Key is missing!");
  process.exit(1);
}

if (!supabaseTable) {
  console.error("Supabase table name is not defined!");
  process.exit(1);
}
