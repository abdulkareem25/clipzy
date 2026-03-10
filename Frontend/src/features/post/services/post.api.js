import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true
});

export async function getFeed() {
  const response = await api.get("/feed");
  return response.data;
}

export async function createPost(postData) {
  const response = await api.post("/create-post", postData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

export default api;