import Link from "next/link";
import AuthNav from "./AuthNav";
import styles from "../Styles/Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.leftNav}>
          <Link href="/" className={styles.logo}>
            ESL Explorers
          </Link>
          <div className={styles.mainNav}>
            <Link href="/about" className={styles.navLink}>
              About Us
            </Link>
            <Link href="/courses" className={styles.navLink}>
              Courses
            </Link>
            <Link href="/pricing" className={styles.navLink}>
              Pricing
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </div>
        </div>
        <AuthNav />
      </nav>
    </header>
  );
}

export default Header;
