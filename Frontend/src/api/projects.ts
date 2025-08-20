import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", 
});

// 🔐 Add JWT Token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProjects = () => API.get("/projects");
export const getProjectById = (id: string) => API.get(`/projects/${id}`);
export const createProject = (data: any) => API.post("/projects", data);
export const updateProject = (id: string, data: any) => API.patch(`/projects/${id}`, data);
export const deleteProject = (id: string) => API.delete(`/projects/${id}`);
