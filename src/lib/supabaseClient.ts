import { createClient } from '@supabase/supabase-js';

/**
 * STEP 1: Supabase Client Setup
 * 
 * Get your keys from:
 * Supabase Dashboard > Project Settings > API
 * 
 * We use both VITE_ and NEXT_PUBLIC_ prefixes to ensure compatibility
 * with both Vite and Next.js environments.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing', supabaseUrl);


if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        'Supabase configuration is missing. \n' +
        'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC equivalents) are set in your .env file.'
    );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || '',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        }
    }
);

export default supabase;
