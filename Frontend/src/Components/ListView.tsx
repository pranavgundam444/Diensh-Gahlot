import {
  ChevronDown,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { useTasks } from "../hooks/useTasks";
import { useNavigate } from 'react-router-dom';

const ListView = () => {
  const { columns, loading } = useTasks();
  const navigate = useNavigate();
  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="space-y-4">
      {columns.map((column) => (
        <div key={column.id}>

          {/* Status */}
          <div className="mb-2 flex items-center gap-1 text-[11px] font-medium">
            <ChevronDown className="h-3 w-3" />

            {column.title}
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-lg border border-gray-200">

            {/* Header */}
            <div className="grid grid-cols-[1fr_85px_90px_100px_40px] bg-gray-50 px-2 py-2 text-[10px] font-medium text-gray-600">
              <span>Task</span>
              <span>Priority</span>
              <span>Members</span>
              <span>Due Date</span>
              <span>Actions</span>
            </div>

            {/* Rows */}
            {column.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
                className="grid grid-cols-[1fr_85px_90px_100px_40px] items-center border-t border-gray-100 px-2 py-3 text-[10px] cursor-pointer"
              >
                <span>{task.title}</span>

                <span
                  className={
                    task.priority === "High"
                      ? "text-red-500"
                      : task.priority === "Medium"
                        ? "text-orange-500"
                        : "text-gray-400"
                  }
                >
                  {task.priority}
                </span>

                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[8px] text-white">
                    {task.assignee ? task.assignee.charAt(0) : '?'}
                  </div>

                  <span>{task.assignee || 'Unassigned'}</span>
                </div>

                <span>{task.dueDate}</span>

                <MoreHorizontal className="h-4 w-4" />
              </div>
            ))}

            {/* Add Task */}
            <button className="flex items-center gap-1 border-t border-gray-100 px-2 py-2 text-[10px]">
              <Plus className="h-3 w-3" />
              Add Task
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;