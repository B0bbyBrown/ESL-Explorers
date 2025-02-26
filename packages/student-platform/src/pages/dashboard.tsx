import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const getPageContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <h1 className={styles.heading}>Welcome to Your Dashboard</h1>
            <p className={styles.description}>
              Track your progress, view lessons, and explore interactive
              learning materials.
            </p>
          </>
        );
      case "lessons":
        return <h1>My Lessons</h1>;
      case "assignments":
        return <h1>Assignments</h1>;
      case "progress":
        return <h1>Progress</h1>;
      case "resources":
        return <h1>Resources</h1>;
      case "settings":
        return <h1>Settings</h1>;
      default:
        return <h1>Page not found</h1>;
    }
  };

  return (
    <DashboardLayout setActivePage={setActivePage}>
      <div className={styles.dashboardContainer}>{getPageContent()}</div>
    </DashboardLayout>
  );
};

export default Dashboard;
