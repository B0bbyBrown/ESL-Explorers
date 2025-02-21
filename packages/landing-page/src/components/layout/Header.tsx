import Logo from "./Logo";
import NavStatic from "./NavStatic";
import AuthNav from "./AuthNav";
import styles from "./Header.module.css"; // ✅ Import CSS Module

export default function Header() {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.navContainer}>
        <NavStatic />
        <AuthNav />
      </div>
    </nav>
  );
}
