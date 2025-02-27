import Link from "next/link";
import styles from "../../styles/Auth.module.css";

export const AuthNav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.buttonGroup}>
        <Link href="/login" className={styles.signInLink}>
          Login
        </Link>
        <Link href="/register" className={styles.registerLink}>
          Register
        </Link>
      </div>
    </nav>
  );
};

export default AuthNav;
