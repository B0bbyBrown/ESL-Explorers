import styles from "../styles/Dashboard.module.css";
import DashboardHeader from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader />
      <h1 className={styles.heading}>Welcome to Your Dashboard</h1>
      <p className={styles.description}>
        Track your progress, view lessons, and explore interactive learning
        materials.
      </p>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
