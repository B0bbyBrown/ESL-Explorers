import Link from "next/link";
import styles from "../../styles/Auth.module.css";

export default function AuthNav() {
  return (
    <nav className={styles.nav}>
      <Link href="/login" className={styles.link}>
        Login
      </Link>
      <Link href="/register" className={styles.link}>
        Register
      </Link>
    </nav>
  );
}
