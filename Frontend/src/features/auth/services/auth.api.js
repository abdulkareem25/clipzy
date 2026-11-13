import api from "../../shared/services/api";

export const signUp = async (userData) => {
  const response = await api.post('/auth/sign-up', userData);
  return response.data;
};

export const signIn = async (credential, password) => {
  const response = await api.post('/auth/sign-in', {
    email: credential,
    username: credential,
    password
  });
  return response.data;
};

export const signOut = async () => {
  const response = await api.post('/auth/sign-out');
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/auth/get-user');
  return response.data;
};