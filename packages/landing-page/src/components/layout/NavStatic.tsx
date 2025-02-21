import { useRouter } from "next/router";
import styles from "./Navbar.module.css"; // ✅ Import CSS Module

export default function NavStatic() {
  const router = useRouter();

  return (
    <ul className={styles.navLinks}>
      <li>
        <button
          className={styles.navButton}
          onClick={() => router.push("/about")}
        >
          About
        </button>
      </li>
      <li>
        <button
          className={styles.navButton}
          onClick={() => router.push("/pricing")}
        >
          Pricing
        </button>
      </li>
      <li>
        <button
          className={styles.navButton}
          onClick={() => router.push("/contact")}
        >
          Contact
        </button>
      </li>
    </ul>
  );
}
