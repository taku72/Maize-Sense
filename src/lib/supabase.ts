import { createClient } from '@supabase/supabase-js'

// Hardcoded values as fallback - move these to .env.local when working
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ixehrglsjcjzyjwuwjez.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpeGVocmdsc2pjemp5d3V3amV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMTM0OTMsImV4cCI6MjA3OTY4OTQ5M30.10VVdPvBbZM0fB-f_Y30UyccEdqeojaX_8-m29tL5j8'

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
