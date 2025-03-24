"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./AuthButtons.module.css";

interface AuthButtonsProps {
  className?: string;
}

// AuthButtons component for handling authentication state and navigation
export const AuthButtons = ({ className }: AuthButtonsProps) => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className={`${styles.authButtons} ${className || ""}`}>
        Loading...
      </div>
    );
  }

  if (user) {
    return (
      <div className={`${styles.authButtons} ${className || ""}`}>
        <Link href="/dashboard" className={styles.dashboardButton}>
          Dashboard
        </Link>
        <button onClick={signOut} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.authButtons} ${className || ""}`}>
      <Link href="/Auth/register" className={styles.registerButton}>
        Register
      </Link>
      <Link href="/Auth/login" className={styles.loginButton}>
        Login
      </Link>
    </div>
  );
};

export { AuthButtons as default };
