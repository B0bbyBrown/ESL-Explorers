import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";

export default function LoginPage() {
  const router = useRouter();

  const handlePlatformSelect = (platform: "student" | "teacher") => {
    router.push(`/login/${platform}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome to ESL Explorers</h1>
        <p className={styles.subtitle}>Choose your platform:</p>

        <div className={styles.buttonGroup}>
          <button
            onClick={() => handlePlatformSelect("student")}
            className={styles.button}
          >
            Student Platform
          </button>
          <button
            onClick={() => handlePlatformSelect("teacher")}
            className={styles.button}
          >
            Teacher Platform
          </button>
        </div>

        <p className={styles.registerLink}>
          New to ESL Explorers?{" "}
          <Link href="/register" className={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
