import { createClient } from "@supabase/supabase-js";

// Default values for development
const defaultSupabaseUrl = "https://mamawoullxushoweknbw.supabase.co";
const defaultSupabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbC1leHBsb3JlcnMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczOTI5NjE0OSwiZXhwIjoyMDU0ODcyMTQ5fQ.2QZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ";

// Use environment variables or fall back to defaults
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

// Log a warning if using default values in production
if (
  process.env.NODE_ENV === "production" &&
  (process.env.NEXT_PUBLIC_SUPABASE_URL !== defaultSupabaseUrl ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== defaultSupabaseAnonKey)
) {
  console.warn(
    "Using default Supabase credentials in production. This is not recommended."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
