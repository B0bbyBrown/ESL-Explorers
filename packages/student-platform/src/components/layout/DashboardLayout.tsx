import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import styles from "./DashboardLayout.module.css";

interface DashboardLayoutProps {
  children: ReactNode;
  setActivePage: (page: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  setActivePage,
}) => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar setActivePage={setActivePage} />
      <div className={styles.mainContent}>
        <DashboardHeader />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
