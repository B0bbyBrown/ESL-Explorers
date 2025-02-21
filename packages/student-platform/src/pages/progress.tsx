import DashboardLayout from "../components/layout/DashboardLayout";
import ProgressTracker from "../components/progress/ProgressTracker";

const Progress = ({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) => {
  return (
    <DashboardLayout setActivePage={setActivePage}>
      <ProgressTracker />
    </DashboardLayout>
  );
};

export default Progress;
