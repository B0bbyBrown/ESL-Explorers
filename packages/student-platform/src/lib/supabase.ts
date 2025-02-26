import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      storageKey: "student.auth.token",
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
