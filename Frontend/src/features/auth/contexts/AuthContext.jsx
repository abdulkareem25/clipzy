import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/auth.api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in by fetching from server
    const initializeAuth = async () => {
      try {
        const userData = await getUser();
        setUser(userData.user);
      } catch (error) {
        // User is not authenticated
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      setLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
};