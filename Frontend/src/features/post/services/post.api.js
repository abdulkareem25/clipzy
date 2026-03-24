import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true
});

export async function getFeed() {
  try {
    const response = await api.get("/feed");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFollowingPosts() {
  try {
    const response = await api.get("/get-following-posts");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Authentication token is missing. Please sign in.");
    }
    throw error;
  }
}

export async function createPost(postData) {
  try {
    const response = await api.post("/create-post", postData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Authentication token is missing. Please sign in.");
    }
    throw error;
  }
}

export default api;