import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Missing Supabase environment variables:
     NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? "✓" : "✗"}
     NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? "✓" : "✗"}`
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  if (error instanceof Error) {
    throw new Error(`Invalid Supabase URL: ${supabaseUrl}. ${error.message}`);
  }
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
