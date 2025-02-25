import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../services/supabase";
import DashboardHeader from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";
import { Session } from "@supabase/supabase-js";

export default function StudentDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data?.session) {
        router.push("http://localhost:3000/login/student"); // Redirect if not logged in
      } else {
        setSession(data.session);
      }
    };

    checkSession();
  }, []);

  if (!session) return <p>Loading...</p>;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <DashboardHeader />
        <h2>Welcome to Your Student Dashboard</h2>
        <p>Select an option from the sidebar:</p>
      </div>
    </div>
  );
}
