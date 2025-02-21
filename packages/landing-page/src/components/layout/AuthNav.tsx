import { useAuth } from "../auth/AuthProvider";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css"; // ✅ Import CSS Module

export default function AuthNav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <ul className={styles.authLinks}>
      {user ? (
        <li>
          <button className={styles.navButton} onClick={logout}>
            Logout
          </button>
        </li>
      ) : (
        <>
          <li>
            <button
              className={styles.navButton}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className={styles.navButton}
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </li>
        </>
      )}
    </ul>
  );
}
