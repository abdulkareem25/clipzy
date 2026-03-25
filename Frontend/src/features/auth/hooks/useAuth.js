import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getUser, signIn, signOut, signUp } from "../services/auth.api";


export const useAuth = () => {

  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleSignUp = async (userData) => {

    setLoading(true);

    const response = await signUp(userData);

    setUser(response.user);
    setLoading(false);

    return response;
  };


  const handleSignIn = async (email, password) => {

    setLoading(true);

    const response = await signIn(email, password);

    setUser(response.user);
    setLoading(false);

    return response;
  };


  const fetchUser = async () => {

    setLoading(true);

    const response = await getUser();

    setUser(response.user);
    setLoading(false);

    return response;
  };


  const handleSignOut = async () => {

    setLoading(true);

    const response = await signOut();

    setUser(null);
    setLoading(false);

    return response;
  };


  return {
    user,
    setUser,
    loading,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    fetchUser
  };
}