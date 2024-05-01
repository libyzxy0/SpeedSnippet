import { supabase } from "@/lib/helper/supabase-client.ts";
import React, { useState, createContext, useEffect } from "react";

import { Session, User, UserResponse } from '@supabase/supabase-js'; // Import UserResponse

interface UserData {
  session: Session | null;
  user: User | null;
  logout: () => void;
}

const initialUser: UserData = { session: null, user: null, logout: () => {} };

export const AuthContext = createContext<UserData>(initialUser);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserData>(initialUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, session, error } = await supabase.auth.getUser<UserResponse>(); // Specify UserResponse type
        if (error) {
          setState(initialUser);
          return;
        }
        if (data) {
          setState({ session, user: data, logout }); // Use data directly for user
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const onChange = (_event: string, session: Session | null) => {
      setState(prevState => ({ ...prevState, session, user: session ? session.user : null }));
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(onChange); 

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

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}
