import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../../../global-comps/utils/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    // Fetch user role with correct error handling
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("email", email)
      .single();

    if (userError || !userData) {
      setError("❌ Admin role not found. Contact support.");
      return;
    }

    if (userData.role !== "admin") {
      setError("❌ Access Denied. Admins Only.");
      return;
    }

    // Redirect to Admin Dashboard  UPDATE
    router.push("/");
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleAdminLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
