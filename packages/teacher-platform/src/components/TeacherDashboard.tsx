import { useEffect } from "react";
import { useSession } from "../contexts/SessionContext";
import styles from "../styles/pages/Dashboard.module.css";

export function TeacherDashboard() {
  const { session, loading, isTeacher } = useSession();

  useEffect(() => {
    if (!loading && (!session || !isTeacher)) {
      window.location.href =
        process.env.NEXT_PUBLIC_MAIN_SITE_URL || "http://localhost:3000";
    }
  }, [session, loading, isTeacher]);

  if (loading) return <div>Loading...</div>;
  if (!session || !isTeacher) return null;

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>ESL Explorers</div>
        <nav className={styles.nav}>
          <ul>
            <li>Dashboard</li>
            <li>My Classes</li>
            <li>Student Management</li>
            <li>Lesson Plans</li>
            <li>Resources</li>
            <li>Assessments</li>
            <li>Reports</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Dashboard</div>
          <div className={styles.userMenu}>
            <span>{session.user.email}</span>
          </div>
        </header>

        <div className={styles.dashboardGrid}>
          <section className={styles.statsSection}>
            <h2>Quick Stats</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Active Classes</h3>
                <p>5</p>
              </div>
              <div className={styles.statCard}>
                <h3>Total Students</h3>
                <p>45</p>
              </div>
              <div className={styles.statCard}>
                <h3>Upcoming Classes</h3>
                <p>3</p>
              </div>
              <div className={styles.statCard}>
                <h3>Pending Reviews</h3>
                <p>12</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default TeacherDashboard;
