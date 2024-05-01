import { supabase } from "@/lib/helper/supabase-client.ts";
import React, { useState, createContext, useEffect } from "react";

interface UserData {
  session: any;
  user: any;
  logout: () => void;
}

const initialUser: UserData = { session: null, user: null, logout: () => {} };

export const AuthContext = createContext<UserData>(initialUser);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserData>(initialUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, session, error }: any = await supabase.auth.getUser();
        if (error || !data) {
          setState(initialUser);
          return;
        }
        if (data) {
          setState({ session, user: data.user, logout });
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const onChange = (_event: string, session: any | null) => {
      setState(prevState => ({ ...prevState, session, user: session ? session.user : null }));
    };

    const { data: { subscription } }: any = supabase.auth.onAuthStateChange(onChange); 

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      const { error }: any = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setState(initialUser);
    } catch (error: any) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}