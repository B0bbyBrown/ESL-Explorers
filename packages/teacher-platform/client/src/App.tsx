import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import DashboardPage from "@/pages/dashboard";
import StudentsPage from "@/pages/dashboard/students";
import LessonsPage from "@/pages/dashboard/lessons";
import CurriculumPage from "@/pages/dashboard/curriculum";
import CalendarPage from "@/pages/dashboard/calendar";
import MessagesPage from "@/pages/dashboard/messages";
import ReportsPage from "@/pages/dashboard/reports";
import MaterialsPage from "@/pages/dashboard/materials";
import BookmarksPage from "@/pages/dashboard/bookmarks";
import SettingsPage from "@/pages/dashboard/settings";
import TeacherLayout from "@/components/layout/teacher-layout";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <>
      <TeacherLayout>
        <Switch>
          <Route path="/" component={DashboardPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/dashboard/students" component={StudentsPage} />
          <Route path="/dashboard/lessons" component={LessonsPage} />
          <Route path="/dashboard/curriculum" component={CurriculumPage} />
          <Route path="/dashboard/calendar" component={CalendarPage} />
          <Route path="/dashboard/messages" component={MessagesPage} />
          <Route path="/dashboard/reports" component={ReportsPage} />
          <Route path="/dashboard/materials" component={MaterialsPage} />
          <Route path="/dashboard/bookmarks" component={BookmarksPage} />
          <Route path="/dashboard/settings" component={SettingsPage} />
          <Route component={NotFound} />
        </Switch>
      </TeacherLayout>
      <Toaster />
    </>
  );
}

export default App;
