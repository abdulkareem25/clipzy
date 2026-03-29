import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://localhost:3000/api/users',
  withCredentials: true,
});

const postApi = axios.create({
  baseURL: 'http://localhost:3000/api/posts',
  withCredentials: true,
});

// Fetch user profile by ID
export const fetchUserProfile = async (userId) => {
  try {
    const response = await userApi.get(`/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user profile' };
  }
};

// Fetch user's posts
export const fetchUserPosts = async (userId) => {
  try {
    const response = await postApi.get(`/get-posts/user/${userId}`);
    return response.data.posts || [];
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user posts' };
  }
};

// Fetch followers list
export const fetchFollowers = async (userId) => {
  try {
    const response = await userApi.get(`/followers/${userId}`);
    return response.data.followers || [];
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch followers' };
  }
};

// Fetch following list
export const fetchFollowing = async (userId) => {
  try {
    const response = await userApi.get(`/following/${userId}`);
    return response.data.following || [];
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch following' };
  }
};

// Check follow status
export const checkFollowStatus = async (userId) => {
  try {
    const response = await userApi.get(`/follow/check/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to check follow status' };
  }
};

// Follow a user
export const followUser = async (userId) => {
  try {
    const response = await userApi.post(`/follow/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to follow user' };
  }
};

// Unfollow a user
export const unfollowUser = async (userId) => {
  try {
    const response = await userApi.post(`/unfollow/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to unfollow user' };
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await userApi.put('/profile', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};
