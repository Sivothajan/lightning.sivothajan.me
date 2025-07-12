import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseTable = process.env.SUPABASE_TABLE;

const supabase = createClient(supabaseUrl, supabasePublicAnonKey);

export default { supabase, supabaseTable };
