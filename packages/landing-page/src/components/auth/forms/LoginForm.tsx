import { useState } from "react";
import Link from "next/link";
import { supabase } from "global-comps/src/utils/supabaseClient";
import { FormInput } from "../shared/FormInput";
import { UserPlatform, AuthFormData } from "../types/auth.types";
import { validateLogin } from "../utils/authValidation";
import styles from "../styles/LoginForm.module.css";
import sharedStyles from "../styles/shared.module.css";

interface LoginFormProps {
  platform: UserPlatform;
}

export const LoginForm = ({ platform }: LoginFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate form data
    const validationError = validateLogin(formData.email, formData.password);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      // 1. Sign in attempt
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      if (signInError) throw signInError;

      // 2. Verify user role and approval status
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

      // 3. Check approval status for teachers
      if (platform === "teacher" && !userData.approved) {
        throw new Error(
          "Your teacher account is pending approval. Please check back later."
        );
      }

      // 4. Update session metadata
      await supabase.auth.updateUser({
        data: {
          role: platform,
          last_login: new Date().toISOString(),
        },
      });

      // 5. Redirect to appropriate platform
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
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={sharedStyles.error}>{error}</div>}

      <FormInput
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <FormInput
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <button type="submit" className={sharedStyles.button} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className={styles.links}>
        <Link href={`/auth/register/${platform}`} className={sharedStyles.link}>
          Don&apos;t have an account? Register here
        </Link>
        <Link href="/auth/forgot-password" className={sharedStyles.link}>
          Forgot Password?
        </Link>
      </div>
    </form>
  );
};
