import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../api/projects";
import { useNavigate } from "react-router-dom";

export default function ProjectsList() {
  const [projects, setProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data } = await getProjects();
    setProjects(data);
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    loadProjects();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => navigate("/projects/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.projectId} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>Status: {p.status}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigate(`/projects/${p.projectId}`)}
                className="text-blue-600 underline"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/projects/edit/${p.projectId}`)}
                className="text-green-600 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.projectId)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
