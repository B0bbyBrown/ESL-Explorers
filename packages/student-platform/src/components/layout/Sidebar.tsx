import styles from "./Sidebar.module.css";

interface SidebarProps {
  setActivePage: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>ESL Explorers</div>
      <nav className={styles.nav}>
        <ul>
          <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
          <li onClick={() => setActivePage("lessons")}>My Lessons</li>
          <li onClick={() => setActivePage("assignments")}>Assignments</li>
          <li onClick={() => setActivePage("progress")}>Progress</li>
          <li onClick={() => setActivePage("resources")}>Resources</li>
          <li onClick={() => setActivePage("settings")}>Settings</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
