import api from '../../shared/services/api';

export async function getFeed() {
  try {
    const response = await api.get("/posts/feed");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFollowingPosts() {
  try {
    const response = await api.get("/posts/get-following-posts");
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
    const response = await api.post("/posts/create-post", postData, {
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

export async function likePost(postId) {
  try {
    const response = await api.post(`/posts/like/${postId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Authentication token is missing. Please sign in.");
    }
    throw error;
  }
}

export async function dislikePost(postId) {
  try {
    const response = await api.post(`/posts/dislike/${postId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Authentication token is missing. Please sign in.");
    }
    throw error;
  }
}

export default api;