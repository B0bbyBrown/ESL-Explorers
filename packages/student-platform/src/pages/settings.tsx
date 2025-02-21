import DashboardLayout from "../components/layout/DashboardLayout";
import Settings from "../components/useSettings/Settings";

const SettingsPage = () => {
  return (
    <DashboardLayout setActivePage={() => {}}>
      <Settings />
    </DashboardLayout>
  );
};

export default SettingsPage;
