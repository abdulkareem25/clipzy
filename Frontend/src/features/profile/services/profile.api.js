import api from "../../shared/services/api";

// Fetch user profile by ID
export const fetchUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user profile' };
  }
};

// Fetch user's posts
export const fetchUserPosts = async (userId) => {
  try {
    const response = await api.get(`/posts/get-posts/user/${userId}`);
    return response.data.posts || [];
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user posts' };
  }
};

// Fetch followers list
export const fetchFollowers = async (userId) => {
  try {
    const response = await api.get(`/users/followers/${userId}`);
    return response.data.followers || [];
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch followers' };
  }
};

// Fetch following list
export const fetchFollowing = async (userId) => {
  try {
    const response = await api.get(`/users/following/${userId}`);
    return response.data.following || [];
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch following' };
  }
};

// Check follow status
export const checkFollowStatus = async (userId) => {
  try {
    const response = await api.get(`/users/follow/check/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to check follow status' };
  }
};

// Follow a user
export const followUser = async (userId) => {
  try {
    const response = await api.post(`/users/follow/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to follow user' };
  }
};

// Unfollow a user
export const unfollowUser = async (userId) => {
  try {
    const response = await api.post(`/users/unfollow/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to unfollow user' };
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};
