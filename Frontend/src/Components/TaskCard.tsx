import {
  CalendarDays,
  MoreHorizontal,
  Tag,
} from "lucide-react";

import type { Task } from "./data/tasks";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">

      {/* Title */}
      <div className="mb-3 flex items-start justify-between">
        <p className="text-[12px] font-medium">
          {task.title}
        </p>

        <MoreHorizontal className="h-4 w-4 text-gray-500" />
      </div>

      {/* Assignee + Date */}
      <div className="mb-3 flex items-center justify-between">

        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[8px] text-white">
            {task.assignee ? task.assignee.charAt(0) : '?'}
          </div>

          <span className="text-[10px]">
            {task.assignee || 'Unassigned'}
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-1 text-[9px] text-red-500">
          <CalendarDays className="h-3 w-3" />

          {task.dueDate}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {(task.tags || []).map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[9px]"
          >
            <Tag className="h-2.5 w-2.5" />

            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;