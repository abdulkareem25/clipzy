import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true
})

export const signUp = async (userData) => {
  const response = await api.post('/sign-up', userData);
  return response.data;
};

export const signIn = async (email, password) => {
  const response = await api.post('/sign-in', {
    email,
    password
  });
  return response.data;
};

export const signOut = async () => {
  const response = await api.post('/sign-out');
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/get-user');
  return response.data;
};