import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import styles from "../Styles/Auth.module.css"; // Optional styling

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginModal({ closeModal }: { closeModal: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [platform, setPlatform] = useState<"student" | "teacher" | null>(null);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!platform) {
      setError("⚠️ Please select a platform (Student or Teacher)");
      return;
    }

    // Authenticate user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Fetch user role from Supabase
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user?.id)
      .single();

    if (userError || !userData) {
      setError("❌ Error retrieving user role.");
      return;
    }

    // Check if the selected platform matches the user's actual role
    if (userData.role !== platform) {
      setError(
        `❌ Your account is registered as a ${userData.role}, not a ${platform}.`
      );
      return;
    }

    // Redirect based on platform
    window.location.href =
      platform === "teacher"
        ? "http://localhost:3001/dashboard"
        : "http://localhost:3002/dashboard";
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            <input
              type="radio"
              name="platform"
              value="student"
              onChange={() => setPlatform("student")}
              required
            />{" "}
            Student
          </label>
          <label>
            <input
              type="radio"
              name="platform"
              value="teacher"
              onChange={() => setPlatform("teacher")}
              required
            />{" "}
            Teacher
          </label>

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
          <button type="submit">Log In</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={closeModal} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}
