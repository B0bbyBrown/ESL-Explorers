import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../../../global-comps/utils/supabaseClient";

export default function StudentRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // ✅ Store user role in the `users` table
    await supabase
      .from("users")
      .insert([{ id: data.user?.id, name, email, role: "student" }]);

    await supabase
      .from("students")
      .insert([
        { id: data.user?.id, name, email, subscription_status: "inactive" },
      ]);

    setSuccess("✅ Registration successful! Check your email.");
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleRegister}>
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
        <button type="button" onClick={() => router.push("/register")}>
          Back
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
