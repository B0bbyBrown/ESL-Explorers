import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Auth.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const handlePlatformSelect = (platform: "student" | "teacher") => {
    router.push(`/register/${platform}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Join ESL Explorers</h1>
        <p className={styles.subtitle}>Choose your account type:</p>

        <div className={styles.buttonGroup}>
          <button
            onClick={() => handlePlatformSelect("student")}
            className={styles.button}
          >
            Student Account
          </button>
          <button
            onClick={() => handlePlatformSelect("teacher")}
            className={styles.button}
          >
            Teacher Account
          </button>
        </div>

        <p className={styles.registerLink}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
