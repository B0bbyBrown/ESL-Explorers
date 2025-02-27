import { useState } from "react";
import { supabase } from "global-comps/src/utils/supabaseClient";
import styles from "./Styles/AuthForm.module.css";

export const LoginForm = ({
  platform,
}: {
  platform: "student" | "teacher";
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Sign in
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      // 2. Verify user role
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user?.id)
        .single();

      if (userError || !userData) {
        throw new Error("Error retrieving user role");
      }

      if (userData.role !== platform) {
        throw new Error(
          `Account is registered as a ${userData.role}, not a ${platform}`
        );
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
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>{platform.charAt(0).toUpperCase() + platform.slice(1)} Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
