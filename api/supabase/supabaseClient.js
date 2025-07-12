import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseTable = process.env.SUPABASE_TABLE;

export const supabase = createClient(supabaseUrl, supabasePublicAnonKey);
