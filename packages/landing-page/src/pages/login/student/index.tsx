import React, { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import styles from "../../../styles/Auth.module.css";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      storageKey: "supabase.auth.token",
      autoRefreshToken: true,
    },
  }
);

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("🔑 Starting login process for:", email);

    try {
      // 1. Sign in
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      if (!signInData.user) throw new Error("No user data returned");

      // 2. Update auth metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          role: "student",
          platform: "student",
          last_login: new Date().toISOString(),
        },
      });

      if (updateError) throw updateError;

      // 3. Verify final session state
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error("Failed to verify session");

      console.log("✅ Login successful:", {
        userId: session.user.id,
        email: session.user.email,
        metadata: session.user.user_metadata,
        expiresAt: new Date(session.expires_at! * 1000).toLocaleString(),
      });

      // 4. Redirect with delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = "http://localhost:3001/dashboard";
    } catch (error) {
      console.error("❌ Login error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Student Login</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? "Logging in..." : "Log In"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              disabled={loading}
              className={styles.buttonSecondary}
            >
              Back
            </button>
          </div>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
