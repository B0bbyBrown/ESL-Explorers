"use client";

import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./AuthButtons.module.css";

export const AuthButtons = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className={styles.authButtons}>Loading...</div>;
  }

  if (user) {
    return (
      <div className={styles.authButtons}>
        <Link href="/dashboard" className={styles.dashboardButton}>
          Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.authButtons}>
      <Link href="/register" className={styles.registerButton}>
        Register
      </Link>
      <Link href="/login" className={styles.loginButton}>
        Login
      </Link>
    </div>
  );
};

export { AuthButtons as default };
