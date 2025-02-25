import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false, // Don't persist session from other platforms
      storageKey: "student-platform-auth", // Platform-specific storage key
      autoRefreshToken: false, // Prevent automatic token refresh
      detectSessionInUrl: false, // Don't detect session in URL
    },
  }
);

export default supabase;
