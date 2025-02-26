import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../lib/supabase";
import { MAIN_SITE_URL } from "../utils/constants";

type SessionContextType = {
  session: Session | null;
  loading: boolean;
  isStudent: boolean;
};

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

  const checkPlatform = async (session: Session | null) => {
    if (!session?.user) {
      console.log("❌ No user in session");
      return false;
    }

    console.log("🔍 Checking session:", {
      userId: session.user.id,
      email: session.user.email,
      metadata: session.user.user_metadata,
      appMetadata: session.user.app_metadata,
    });

    // Check metadata in multiple locations
    const metadata = session.user.user_metadata;
    const appMetadata = session.user.app_metadata;

    const isValid =
      (metadata?.role === "student" && metadata?.platform === "student") ||
      appMetadata?.role === "student";

    console.log("✅ Session check result:", {
      metadata,
      appMetadata,
      isValid,
    });

    return isValid;
  };

  useEffect(() => {
    let mounted = true;
    console.log("🔄 SessionProvider mounted");

    const initSession = async () => {
      try {
        console.log("📥 Fetching initial session");
        const {
          data: { session: currentSession },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("❌ Error fetching session:", sessionError.message);
          return;
        }

        if (!currentSession) {
          console.log("⚠️ No session found");
          if (mounted) setLoading(false);
          return;
        }

        console.log("✅ Session retrieved:", {
          user: currentSession.user.email,
          expiresAt: new Date(
            currentSession.expires_at! * 1000
          ).toLocaleString(),
        });

        if (mounted) {
          const isValidStudent = await checkPlatform(currentSession);

          if (!isValidStudent) {
            console.log("⚠️ Invalid student session, signing out");
            await supabase.auth.signOut();
            window.location.replace(MAIN_SITE_URL);
            return;
          }

          console.log("✅ Valid student session confirmed");
          setSession(currentSession);
          setIsStudent(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Session initialization error:", error);
        if (mounted) setLoading(false);
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log("🔄 Auth state changed:", event);

      if (mounted && currentSession) {
        const isValidStudent = await checkPlatform(currentSession);

        if (!isValidStudent) {
          console.log("⚠️ Invalid session state");
          await supabase.auth.signOut();
          window.location.replace(MAIN_SITE_URL);
          return;
        }

        setSession(currentSession);
        setIsStudent(true);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, isStudent }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
