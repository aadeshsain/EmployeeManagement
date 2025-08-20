import { useState, useEffect } from "react";
import { createProject, getProjectById, updateProject } from "../api/projects";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ name: "", status: "", startDate: "", endDate: "" });

  useEffect(() => {
    if (isEdit) {
      getProjectById(id!).then(({ data }) => setForm({
        name: data.name,
        status: data.status,
        startDate: data.startDate?.slice(0,10) || "",
        endDate: data.endDate?.slice(0,10) || ""
      }));
    }
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isEdit) {
      await updateProject(id!, form);
    } else {
      await createProject(form);
    }
    navigate("/projects");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit Project" : "New Project"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Project Name" className="w-full border p-2 rounded" />
        <input name="status" value={form.status} onChange={handleChange} placeholder="Status" className="w-full border p-2 rounded" />
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full border p-2 rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">{isEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
