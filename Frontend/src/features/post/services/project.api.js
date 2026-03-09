import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000/api/projects",
  withCredentials: true
});

export async function getProjects() {
  const response = await api.get("/get-projects");
  return response.data;
}

export async function createProject(title, description) {
  const response = await api.post("/create-project", { title, description });
  return response.data;
}

export default api;
