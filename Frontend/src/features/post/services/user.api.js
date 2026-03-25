import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/api/users",
  withCredentials: true
});

export const followUser = async (followeeId) => {
  const response = await api.post(`/follow/${followeeId}`);
  return response.data;
};

export const unfollowUser = async (followeeId) => {
  const response = await api.post(`/unfollow/${followeeId}`);
  return response.data;
};

export const checkFollowStatus = async (followeeId) => {
  const response = await api.get(`/follow/check/${followeeId}`);
  return response.data;
};
