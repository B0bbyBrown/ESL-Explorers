import Link from "next/link";
import { useSession } from "../../contexts/SessionContext";
import styles from "./AuthNav.module.css";

export function AuthNav() {
  const { session, signOut } = useSession();

  if (!session) {
    return (
      <div className={styles.container}>
        <Link href="/login" className={styles.signInLink}>
          Sign in
        </Link>
        <Link href="/register" className={styles.registerLink}>
          Create account
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <span className={styles.userEmail}>{session.user.email}</span>
      <button onClick={() => signOut()} className={styles.signOutButton}>
        Sign out
      </button>
    </div>
  );
}

export default AuthNav;
