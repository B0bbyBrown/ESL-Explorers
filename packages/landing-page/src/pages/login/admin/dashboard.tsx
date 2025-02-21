import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const { data: user } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      const { data: userData } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.user?.id)
        .single();

      if (!userData || userData.role !== "admin") {
        router.push("/");
      } else {
        setIsAdmin(true);
      }
    }

    checkAdmin();
  }, []);

  if (!isAdmin) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}
