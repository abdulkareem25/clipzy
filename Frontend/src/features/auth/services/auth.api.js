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