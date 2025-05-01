import { createClient, SupabaseClient } from '@supabase/supabase-js'

// @ts-ignore - stop
const supabaseUrl = import.meta.env.RENDERER_VITE_SUPABASE_URL
// @ts-ignore - stop
const supabaseAnonKey = import.meta.env.RENDERER_VITE_SUPABASE_ANON_KEY

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

console.log(supabase)
