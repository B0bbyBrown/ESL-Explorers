import { useEffect } from "react";
import { useSession } from "../contexts/SessionContext";
import { StudentDashboard } from "../components/StudentDashboard";
import LoadingState from "../components/LoadingState";
import { MAIN_SITE_URL } from "../utils/constants";

export default function Home() {
  const { session, loading, isStudent } = useSession();

  useEffect(() => {
    // Detailed session logging
    console.group("Student Platform - Home Page");
    console.log("Loading state:", loading);
    console.log("Session:", {
      exists: !!session,
      email: session?.user?.email,
      metadata: session?.user?.user_metadata,
    });
    console.log("Is Student:", isStudent);
    console.groupEnd();

    // Only redirect if we're sure there's no valid session
    if (!loading && (!session || !isStudent)) {
      console.log("🚨 Redirecting to main site:", {
        reason: {
          noSession: !session,
          notStudent: !isStudent,
        },
      });
      window.location.href = MAIN_SITE_URL;
    }
  }, [session, loading, isStudent]);

  if (loading) return <LoadingState />;
  if (!session || !isStudent) return null;

  // Show dashboard if both conditions are true
  console.log(
    "✅ Student Platform - Rendering dashboard for:",
    session.user.email
  );
  return <StudentDashboard />;
}
