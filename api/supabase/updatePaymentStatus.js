import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseTable = process.env.SUPABASE_TABLE;

const supabase = createClient(supabaseUrl, supabasePublicAnonKey);

const updatePaymetStatus = async (uuid, isPaid) => {
    const { boolValue, error } = await supabase
        .from(supabaseTable)
        .update({ isPaid:  isPaid})
        .eq('uuid', uuid)
        .select()
        
    if (error) {
        console.error('Error fetching data:', error);
        return false;
    } else {
        console.log(boolValue);
        console.log('Data fetched successfully!');
        return true;
    }
};

export default updatePaymetStatus;
