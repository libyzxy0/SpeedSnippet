import { supabase } from "@/lib/helper/supabase-client.ts";
import React, { useState, createContext, useEffect } from "react";

interface UserData {
  session: unknown | null;
  user: unknown | null;
}

const initialUser: UserData = { session: null, user: null };

export const AuthContext = createContext<UserData>(initialUser);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserData>(initialUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, session, error } = await supabase.auth.getUser();
        if (error) {
          setState(initialUser);
          return;
        }
        if (data) {
          setState({ session, user: data });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const onChange = (event: string, session: unknown | null) => {
      //console.log(event, session)
      setState({ session, user: session ? (session as any).user : null });
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(onChange);

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setState(initialUser);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const { session, user } = state || {};

  return (
    <AuthContext.Provider value={{ session, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
