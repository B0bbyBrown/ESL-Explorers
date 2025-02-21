import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.heading}>Welcome to Your Dashboard</h1>
      <p className={styles.description}>
        Track your progress, view lessons, and explore interactive learning
        materials.
      </p>
    </div>
  );
};

export default Dashboard;
