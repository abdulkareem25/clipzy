import api from "../../shared/services/api";

export const followUser = async (followeeId) => {
  const response = await api.post(`/users/follow/${followeeId}`);
  return response.data;
};

export const unfollowUser = async (followeeId) => {
  const response = await api.post(`/users/unfollow/${followeeId}`);
  return response.data;
};

export const checkFollowStatus = async (followeeId) => {
  const response = await api.get(`/users/follow/check/${followeeId}`);
  return response.data;
};
