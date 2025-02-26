import { useEffect } from "react";
import { useSession } from "../../contexts/SessionContext";
import { MAIN_SITE_URL } from "../../utils/constants";
import LoadingState from "../LoadingState";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading, isStudent } = useSession();

  useEffect(() => {
    if (!loading && (!session || !isStudent)) {
      window.location.href = MAIN_SITE_URL;
    }
  }, [session, loading, isStudent]);

  if (loading) return <LoadingState />;
  if (!session || !isStudent) return null;

  return <>{children}</>;
}
