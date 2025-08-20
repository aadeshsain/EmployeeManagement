// src/api/tasks.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Create Task
export const createTask = (projectId: number, data: any) =>
  API.post(`/projects/${projectId}/tasks`, data);

// Get Tasks by Project
export const getTasksByProject = (projectId: number) =>
  API.get(`/projects/${projectId}/tasks`);

// Get Task by ID
export const getTaskById = (id: number) =>
  API.get(`/tasks/${id}`);

// Update Task
export const updateTask = (id: number, data: any) =>
  API.patch(`/tasks/${id}`, data);

// Delete Task
export const deleteTask = (id: number) =>
  API.delete(`/tasks/${id}`);

// Assign Task
export const assignTask = (id: number, data: any) =>
  API.post(`/tasks/${id}/assign`, data);
