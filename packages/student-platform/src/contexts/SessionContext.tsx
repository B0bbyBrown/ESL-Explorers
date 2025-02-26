import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../lib/supabase";
import { MAIN_SITE_URL } from "../utils/constants";

interface SessionContextType {
  session: Session | null;
  loading: boolean;
  isStudent: boolean;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  isStudent: false,
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        if (!currentSession) {
          setLoading(false);
          return;
        }

        const userRole = currentSession.user.user_metadata.role;

        if (userRole !== "student") {
          console.log("Invalid platform access, redirecting...");
          await supabase.auth.signOut();
          window.location.href = MAIN_SITE_URL;
          return;
        }

        setSession(currentSession);
        setIsStudent(true);
      } catch (error) {
        console.error("Session check error:", error);
        window.location.href = MAIN_SITE_URL;
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        window.location.href = MAIN_SITE_URL;
      }
      setSession(session);
      setIsStudent(session?.user.user_metadata.role === "student");
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, isStudent }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
