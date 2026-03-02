import { createContext, useState } from "react";
import { signUp, signIn, signOut, getUser } from "./auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleSignUp = async (username, email, password) => {

        setLoading(true);
        try {
            const response = await signUp(username, email, password);
            setUser(response.user);
        } catch (error) {
            console.error("handleSignUp error:", error);
        } finally {
            setLoading(false);
        };
    };

    const handleSignIn = async (email, password) => {
        setLoading(true);
        try {
            const response = await signIn(email, password);
            setUser(response.user);
        } catch (error) {
            console.error("handleSignIn error:", error);
        } finally {
            setLoading(false);
        };
    };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await signOut();
            setUser(null);
        } catch (error) {
            console.error("handleSignOut error:", error);
        } finally {
            setLoading(false);
        };
    };

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await getUser();
            setUser(response.user);
        } catch (error) {
            console.error("fetchUser error:", error);
        } finally {
            setLoading(false);
        };
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            handleSignUp,
            handleSignIn,
            handleSignOut,
            fetchUser
        }}>
            {children}
        </AuthContext.Provider>
    )
};