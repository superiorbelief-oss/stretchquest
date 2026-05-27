import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://awmqisboatglzcffvyki.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3bXFpc2JvYXRnbHpjZmZ2eWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2OTQwNDUsImV4cCI6MjA5NTI3MDA0NX0.y1wwNSNbufwVuBihF2r0Nbv19EoHajyPNl3zcGXMHeo"

export const supabase = createClient(supabaseUrl, supabaseKey)