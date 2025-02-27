import styles from "../Styles/Navbar.module.css";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className={styles.navbar}>
        <div className="logo">ESL Explorers</div>
        <ul className="nav-links">
          {user ? (
            <button>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </button>
          ) : (
            <>
              <li>
                <Link href="/login/student/">Student Login</Link>
              </li>
              <li>
                <Link href="/login/teacher/">Teacher Login</Link>
              </li>
              <li>
                <Link href="/register/">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
