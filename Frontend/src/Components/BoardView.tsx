import {
  GripVertical,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import TaskCard from "./TaskCard";
import { useTasks } from "../hooks/useTasks";
import { useNavigate } from 'react-router-dom';

const BoardView = () => {
  const { columns, loading } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="flex min-w-max gap-3">
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        columns.map((column) => (
          <div
            key={column.id}
            className="w-[205px] shrink-0 rounded-lg bg-[#f5f5f5] p-2"
          >
          {/* Column Header */}
          <div className="mb-2 flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <GripVertical className="h-3 w-3 text-gray-500" />

              <span className="text-[11px] font-semibold">
                {column.title}
              </span>
            </div>

            <div className="flex gap-1">
              <Plus className="h-3.5 w-3.5 cursor-pointer" />

              <MoreHorizontal className="h-3.5 w-3.5 cursor-pointer" />
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-2">
            {column.tasks.map((task) => (
              <div key={task.id} onClick={() => navigate(`/tasks/${task.id}`)} className="cursor-pointer">
                <TaskCard task={task} />
              </div>
            ))}
          </div>

          {/* Add Task */}
          <button className="mt-2 flex items-center gap-1 px-2 py-2 text-[10px]">
            <Plus className="h-3 w-3" />
            Add Task
          </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BoardView;