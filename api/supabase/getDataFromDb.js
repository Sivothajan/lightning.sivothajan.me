import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseTable = process.env.SUPABASE_TABLE;

const supabase = createClient(supabaseUrl, supabasePublicAnonKey);

const getDataFromDb = async (uuid) => {
    const { data, error } = await supabase
        .from(supabaseTable)
        .select('*')
        .eq('uuid', uuid);

    if (error) {
        console.error('Error fetching data:', error);
    } else {
        console.log('Data fetched successfully!');
        return data;
    }
};

export default getDataFromDb;
