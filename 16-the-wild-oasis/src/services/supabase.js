
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY } from '../../secrets';
import { SUPABASE_URL } from '../utils/constants';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase