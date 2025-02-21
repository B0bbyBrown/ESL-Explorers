import { useAuth } from "../auth/AuthProvider";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className="logo">ESL Explorers</div>
      <ul className="nav-links">
        {user ? (
          <>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/register"}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
