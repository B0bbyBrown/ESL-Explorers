import DashboardLayout from "../components/layout/DashboardLayout";
import LessonList from "../components/lessons/LessonList";

const Lessons = ({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) => {
  return (
    <DashboardLayout setActivePage={setActivePage}>
      <LessonList />
    </DashboardLayout>
  );
};

export default Lessons;
