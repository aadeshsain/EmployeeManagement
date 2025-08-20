// src/components/TaskList.tsx
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete }: { tasks: any[]; onDelete: (id: number) => void }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}
