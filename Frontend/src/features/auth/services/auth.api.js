import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:3000/api/auth',
    withCredentials: true
});

export const signUp = async (username, email, password) => {
    try {

        const response = await api.post('/sign-up', {
            username, 
            email,
            password
        });

        return response.data;

    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

export const signIn = async (email, password) => {
    try {

        const response = await api.post('/sign-in', {
            email,
            password
        });

        return response.data;

    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await api.post('/sign-out');
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    };
};

export const getUser = async () => {
    try {
        const response = await api.get('/get-user');
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    };
};