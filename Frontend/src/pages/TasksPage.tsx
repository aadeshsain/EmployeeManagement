// src/pages/TasksPage.tsx
import { useEffect, useState } from "react";
import { createTask, getTasksByProject, deleteTask } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const projectId = 1; // Example project

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasksByProject(projectId);
    setTasks(res.data);
  };

  const handleCreate = async (task: any) => {
    await createTask(projectId, task);
    loadTasks();
  };

  const handleDelete = async (id: number) => {          
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Project Tasks</h1>
      <TaskForm onSubmit={handleCreate} />
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  );
}
