import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import styles from "./DashboardHeader.module.css";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const DashboardHeader = () => {
  const [studentName, setStudentName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentInfo = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();

      if (!user || userError) {
        router.push("/login/student"); // Redirect if not logged in
        return;
      }

      const { data: student } = await supabase
        .from("students")
        .select("name")
        .eq("id", user.user?.id)
        .single();

      if (student) {
        setStudentName(student.name);
      } else {
        setStudentName("Unknown Student");
      }
    };

    fetchStudentInfo();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login/student");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Student Dashboard</h1>
      <div className={styles.profileSection}>
        <span className={styles.username}>👤 {studentName}</span>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
