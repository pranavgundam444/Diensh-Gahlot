import { ChevronDown, ChevronsUpDown, Folder, LayoutGrid } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname.startsWith("/projects")
    ? "projects"
    : "tasks";
  return (
    <aside className="flex h-screen w-[200px] shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Workspace Header */}
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          {/* Avatar / Logo */}
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-[10px] font-semibold text-white">
            P
          </div>

          <span className="text-[13px] font-semibold text-gray-900">
            Pranav
          </span>
        </div>

        <ChevronsUpDown className="h-3.5 w-3.5 text-gray-700" />
      </div>

      {/* Workspace */}
      <div className="px-3">
        {/* Workspace title */}
        <div className="mb-1 flex items-center justify-between px-2 py-1">
          <span className="text-[12px] text-gray-700">Workspace</span>

          <ChevronDown className="h-3.5 w-3.5 text-gray-700" />
        </div>

        {/* Tasks */}
        <button
          className={`
            flex
            w-full
            items-center
            gap-2
            rounded-lg
            ${active === "tasks" ? "bg-gray-100" : ""}
            px-2
            py-2
            text-left
            text-[12px]
            font-medium
            text-gray-900
          `}
          onClick={() => navigate("/tasks")}
        >
          <LayoutGrid className="h-4 w-4" />

          <span>Tasks</span>
        </button>

        {/* Projects */}
        <button
          className={`
            mt-1
            flex
            w-full
            items-center
            gap-2
            rounded-lg
            ${active === "projects" ? "bg-gray-100" : ""}
            px-2
            py-2
            text-left
            text-[12px]
            text-gray-700
            hover:bg-gray-50
          `}
          onClick={() => navigate("/projects")}
        >
          <Folder className="h-4 w-4" />

          <span>Projects</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
