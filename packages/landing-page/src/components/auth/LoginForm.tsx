import { useState } from "react";
import { supabase } from "global-comps/src/utils/supabaseClient";
import styles from "./Styles/AuthForm.module.css";
import Link from "next/link";

interface LoginFormProps {
  platform: "student" | "teacher";
}

export const LoginForm = ({ platform }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Sign in attempt
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      // 2. Check user role and approval status
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role, approved")
        .eq("id", data.user?.id)
        .single();

      if (userError || !userData) {
        throw new Error("Error retrieving user information");
      }

      if (userData.role !== platform) {
        throw new Error(
          `This account is registered as a ${userData.role}, not a ${platform}`
        );
      }

      // Check approval status for teachers
      if (platform === "teacher" && !userData.approved) {
        throw new Error("Your teacher account is pending approval");
      }

      // 3. Update session metadata
      await supabase.auth.updateUser({
        data: { role: platform, last_login: new Date().toISOString() },
      });

      // 4. Redirect to appropriate platform
      const platformUrl =
        platform === "teacher"
          ? process.env.NEXT_PUBLIC_TEACHER_URL
          : process.env.NEXT_PUBLIC_STUDENT_URL;

      window.location.href = `${platformUrl}/dashboard`;
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.authForm}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className={styles.links}>
        <Link href={`/auth/register/${platform}`}>
          Don&apos;t have an account? Register here
        </Link>
        <Link href="/auth/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  );
};
