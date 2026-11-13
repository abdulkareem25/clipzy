import api from "../../shared/services/api";

export async function getProjects() {
  const response = await api.get("/projects/get-projects");
  return response.data;
}

export async function createProject(title, description) {
  const response = await api.post("/projects/create-project", { title, description });
  return response.data;
}

export default api;
