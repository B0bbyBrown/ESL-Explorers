import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import styles from "../Styles/Auth.module.css";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RegisterModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState<"student" | "teacher" | "">(
    ""
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!accountType) {
      setError("⚠️ Please select an account type (Student or Teacher)");
      return;
    }

    // Register the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Store user details in the correct Supabase table
    if (accountType === "student") {
      await supabase
        .from("students")
        .insert([
          { id: data.user?.id, name, email, subscription_status: "inactive" },
        ]);
    } else {
      await supabase
        .from("teachers")
        .insert([{ id: data.user?.id, name, email, approved: false }]);
    }

    setSuccess("✅ Registration successful! Check your email.");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label>
            <input
              type="radio"
              name="accountType"
              value="student"
              onChange={() => setAccountType("student")}
            />{" "}
            Student
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              value="teacher"
              onChange={() => setAccountType("teacher")}
            />{" "}
            Teacher
          </label>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button onClick={closeModal} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}
