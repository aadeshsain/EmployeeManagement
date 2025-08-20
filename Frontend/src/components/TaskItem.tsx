// src/components/TaskItem.tsx
export default function TaskItem({ task, onDelete }: { task: any; onDelete: (id: number) => void }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
      <div>
        <h4 className="font-semibold">{task.title}</h4>
        <p className="text-sm">{task.description}</p>
        <span className="text-xs text-gray-500">Status: {task.status}</span>
      </div>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded-lg"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
}
