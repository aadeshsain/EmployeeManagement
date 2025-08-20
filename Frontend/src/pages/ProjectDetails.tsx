import { useEffect, useState } from "react";
import { getProjectById } from "../api/projects";
import { useParams, useNavigate } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    getProjectById(id!).then(({ data }) => setProject(data));
  }, [id]);

  if (!project) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p>Status: {project.status}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate || "N/A"}</p>

      <button
        onClick={() => navigate("/projects")}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
}
