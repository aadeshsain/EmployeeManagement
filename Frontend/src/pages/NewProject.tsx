import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function NewProject() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projects, setProjects] = useState<any[]>(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/projects", {
        name,
        status,
        startDate,
        endDate,
      });

      const newProject = res.data;
      const updated = [...projects, newProject];
      setProjects(updated);
      localStorage.setItem("projects", JSON.stringify(updated));

      // reset form
      setName("");
      setStatus("Active");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error("Project creation failed", err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>

      {/* Projects List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet</p>
        ) : (
          <ul className="space-y-2">
            {projects.map((p) => (
              <li
                key={p.id}
                className="p-3 border rounded bg-gray-50 shadow-sm"
              >
                <p><strong>{p.name}</strong> ({p.status})</p>
                <p className="text-sm text-gray-600">
                  {p.startDate} → {p.endDate}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
