import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "global-comps/src/utils/supabaseClient";
import styles from "@/styles/Auth.module.css";

export default function TeacherLoginPage() {
  const router = useRouter();
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

      // 2. Check if user exists in database
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role, approved")
        .eq("id", data.user?.id)
        .single();

      if (userError) {
        // User doesn't exist in database, redirect to registration
        router.push(`/register/teacher?email=${encodeURIComponent(email)}`);
        return;
      }

      if (userData.role !== "teacher") {
        throw new Error("This account is not registered as a teacher");
      }

      if (!userData.approved) {
        throw new Error("Your teacher account is pending approval");
      }

      // 3. Update session metadata
      await supabase.auth.updateUser({
        data: {
          role: "teacher",
          last_login: new Date().toISOString(),
        },
      });

      // 4. Redirect to teacher platform
      window.location.href = process.env.NEXT_PUBLIC_TEACHER_URL + "/dashboard";
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
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Teacher Login</h1>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.links}>
          <Link href="/register/teacher" className={styles.link}>
            New teacher? Apply here
          </Link>
          <Link href="/forgot-password" className={styles.link}>
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
