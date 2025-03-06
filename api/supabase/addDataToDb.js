import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseTable = process.env.SUPABASE_TABLE;

const supabase = createClient(supabaseUrl, supabasePublicAnonKey);

const addDataToDb = async (uuid, paymentData) => {
    const { data, error } = await supabase
        .from(supabaseTable)
        .insert([
            { 
                uuid: uuid, 
                data: paymentData
            }
        ]);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Data inserted successfully!');
    }
};

export default addDataToDb;
