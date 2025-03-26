"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./AuthButtons.module.css";

interface AuthButtonsProps {
  className?: string;
}

// AuthButtons component for handling authentication state and navigation
export const AuthButtons = () => {
  return (
    <div className={styles.authButtons}>
      <Link href="/login" className={styles.loginButton}>
        Login
      </Link>
      <Link href="/register" className={styles.registerButton}>
        Get Started
      </Link>
    </div>
  );
};

export { AuthButtons as default };
