import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL?.trim() || 'https://onefnxopknlpwwrgdwgv.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZWZueG9wa25scHd3cmdkd2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NTA3ODYsImV4cCI6MjA1ODIyNjc4Nn0.0CDKGpSORX3g0klbJ--JDdDaQQaIAhMCuk43AkOiAg0'

// Validate URL format
if (!supabaseUrl.startsWith('https://') && !supabaseUrl.startsWith('http://')) {
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
