import { useSession } from "../contexts/SessionContext";
import styles from "../styles/pages/Dashboard.module.css";

export function StudentDashboard() {
  const { session } = useSession();

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>ESL Explorers</div>
        <nav className={styles.nav}>
          <ul>
            <li>Dashboard</li>
            <li>My Courses</li>
            <li>Assignments</li>
            <li>Progress</li>
            <li>Resources</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Dashboard</div>
          <div className={styles.userMenu}>
            <span>{session?.user.email}</span>
          </div>
        </header>

        <div className={styles.dashboardGrid}>
          <section className={styles.statsSection}>
            <h2>My Progress</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Active Courses</h3>
                <p>3</p>
              </div>
              <div className={styles.statCard}>
                <h3>Completed Lessons</h3>
                <p>24</p>
              </div>
              <div className={styles.statCard}>
                <h3>Assignments Due</h3>
                <p>2</p>
              </div>
              <div className={styles.statCard}>
                <h3>Average Score</h3>
                <p>85%</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
