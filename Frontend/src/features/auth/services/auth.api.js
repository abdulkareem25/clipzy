export const signIn = async (credentials) => {
    try {
        const response = await fetch("/api/auth/signin", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to sign in");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }   
};

export const signUp = async (userData) => {
    try {
        const response = await fetch("/api/auth/signup", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }); 
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to sign up");
        }  

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};