import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import {
  getPlatformUrl,
  type Platform,
} from "../../../global-comps/src/utils/platformUrls";

type SessionContextType = {
  session: Session | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
    platform: Platform
  ) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    platform: Platform
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const routeToPlatform = (platform: Platform) => {
    window.location.href = getPlatformUrl(platform);
  };

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    checkSession();

    // Keep session in sync
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (
    email: string,
    password: string,
    platform: Platform
  ) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        // First update the user metadata
        const { error: updateError } = await supabase.auth.updateUser({
          data: { platform },
        });

        if (updateError) throw updateError;

        // Then get the updated session
        const {
          data: { session: updatedSession },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        console.log("Updated session with platform:", {
          email: updatedSession?.user?.email,
          platform: updatedSession?.user?.user_metadata?.platform,
        });

        setSession(updatedSession);

        // Now redirect with the updated session
        routeToPlatform(platform);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    platform: Platform
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { platform },
        },
      });

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
        routeToPlatform(platform);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <SessionContext.Provider
      value={{ session, loading, signIn, signUp, signOut }}
    >
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
