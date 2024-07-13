import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(`https://nkyhlcxjtffjwahnhkzd.supabase.co`, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5reWhsY3hqdGZmandhaG5oa3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyNTUzMjQsImV4cCI6MjAzNDgzMTMyNH0.x3beezoOL9h5MhmNvt3JnFLBJZK3JCnSI4oNeTJNufg`)
// export const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_APIKEY)