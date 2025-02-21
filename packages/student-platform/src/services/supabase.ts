import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true, // ✅ Ensures session is stored and shared across pages
      autoRefreshToken: true, // ✅ Automatically refreshes authentication token
      detectSessionInUrl: true, // ✅ Detects session in URL to prevent login issues
    },
  }
);

export default supabase;
