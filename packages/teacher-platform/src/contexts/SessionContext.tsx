import { createContext, useContext, useEffect, useState } from "react";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";
import supabase from "../services/supabase";

type SessionContextType = {
  session: Session | null;
  loading: boolean;
  isTeacher: boolean;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  isTeacher: false,
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        const platform = data.session.user?.user_metadata?.platform;
        setSession(data.session);
        setIsTeacher(platform === "teacher");
      }
      setLoading(false);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setIsTeacher(session?.user?.user_metadata?.platform === "teacher");
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, isTeacher }}>
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
