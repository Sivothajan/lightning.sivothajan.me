import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseTable = process.env.SUPABASE_TABLE;

const supabase = createClient(supabaseUrl, supabasePublicAnonKey);

const getPaymetStatus = async (uuid) => {
    const { boolValue, error } = await supabase
        .from(supabaseTable)
        .select('isPaid')
        .eq('uuid', uuid);

    if (error) {
        console.error('Error fetching data:', error);
    } else {
        console.log('Data fetched successfully!');
        return boolValue;
    }
};

export default getPaymetStatus;
