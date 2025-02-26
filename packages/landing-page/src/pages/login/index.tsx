import React from "react";
import Link from "next/link";
import styles from "../../styles/Auth.module.css";

export function LoginPage() {
  const handleStudentLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_STUDENT_URL}/login`;
  };

  const handleTeacherLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_TEACHER_URL}/login`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Select your role:</p>
        <div className={styles.buttonGroup}>
          <button onClick={handleStudentLogin} className={styles.button}>
            Student Login
          </button>
          <button onClick={handleTeacherLogin} className={styles.button}>
            Teacher Login
          </button>
        </div>
        <p className={styles.registerLink}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
