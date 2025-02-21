import DashboardLayout from "../components/layout/DashboardLayout";
import StudentProfile from "../components/profile/StudentProfile";

const Profile = ({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) => {
  return (
    <DashboardLayout setActivePage={setActivePage}>
      <StudentProfile />
    </DashboardLayout>
  );
};

export default Profile;
