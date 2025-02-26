import { useEffect } from "react";
import { useSession } from "../contexts/SessionContext";
import { TeacherDashboard } from "../components/TeacherDashboard";

export default function Home() {
  const { session, loading, isTeacher } = useSession();

  useEffect(() => {
    if (!loading && (!session || !isTeacher)) {
      window.location.href =
        process.env.NEXT_PUBLIC_MAIN_SITE_URL || "http://localhost:3000";
    }
  }, [session, loading, isTeacher]);

  if (loading) return <div>Loading...</div>;
  if (!session || !isTeacher) return null;

  return <TeacherDashboard />;
}
