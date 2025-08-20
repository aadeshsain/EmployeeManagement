// src/components/TaskForm.tsx
import { useState } from "react";

export default function TaskForm({ onSubmit }: { onSubmit: (task: any) => void }) {
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="space-y-3 p-4 bg-white shadow rounded-xl"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ title: "", description: "", status: "pending" });
      }}
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        className="w-full p-2 border rounded"
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Task description"
        className="w-full p-2 border rounded"
      />
      <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Save Task
      </button>
    </form>
  );
}
