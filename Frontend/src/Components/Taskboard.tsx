import {
  Search,
  SlidersHorizontal,
  Plus,
  MoreHorizontal,
  GripVertical,
  Tag,
  CalendarDays,
  ChevronDown,
  ChevronsUpDown,
  LayoutGrid,
  Folder,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  assignee: string;
  dueDate: string;
  tags: string[];
};

type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

const columns: Column[] = [
  {
    id: 1,
    title: "To Do",
    tasks: [
      {
        id: 1,
        title: "Write API Documentation",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: 2,
        title: "Implement Search Function",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: 3,
        title: "Deploy to Production",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
    ],
  },
  {
    id: 2,
    title: "Doing",
    tasks: [
      {
        id: 4,
        title: "Code Review Completed",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: 5,
        title: "Design Mockups Finalized",
        assignee: "Admin",
        dueDate: "29 Jul",
        tags: ["Deployment", "Deployment"],
      },
    ],
  },
  {
    id: 3,
    title: "Completed",
    tasks: [
      {
        id: 6,
        title: "Feature Testing Passed",
        assignee: "QA Team",
        dueDate: "30 Jul",
        tags: ["Testing", "Passed"],
      },
      {
        id: 7,
        title: "UI Design Updated",
        assignee: "Designer",
        dueDate: "31 Jul",
        tags: ["Design", "Updated"],
      },
      {
        id: 8,
        title: "Security Audit Scheduled",
        assignee: "Security",
        dueDate: "01 Aug",
        tags: ["Audit", "Scheduled"],
      },
    ],
  },
  {
    id: 4,
    title: "On Hold",
    tasks: [
      {
        id: 9,
        title: "UI Review",
        assignee: "Designer",
        dueDate: "02 Aug",
        tags: ["Review", "Pending"],
      },
      {
        id: 10,
        title: "Backend Integration",
        assignee: "Dev Team",
        dueDate: "03 Aug",
        tags: ["Development", "API"],
      },
      {
        id: 11,
        title: "User Feedback",
        assignee: "Product",
        dueDate: "04 Aug",
        tags: ["Research", "Feedback"],
      },
      {
        id: 12,
        title: "Performance Optimization",
        assignee: "Engineering",
        dueDate: "05 Aug",
        tags: ["Optimization"],
      },
    ],
  },
];

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Task title */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <p className="text-[13px] font-medium leading-5 text-gray-900">
          {task.title}
        </p>

        <MoreHorizontal className="h-4 w-4 shrink-0 text-gray-500" />
      </div>

      {/* Assignee + Date */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-[8px] font-semibold text-white">
            {task.assignee.charAt(0)}
          </div>

          <span className="text-[11px] text-gray-700">
            {task.assignee}
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-1 text-[10px] font-medium text-red-500">
          <CalendarDays className="h-3 w-3" />
          {task.dueDate}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {task.tags.map((tag, index) => (
          <div
            key={`${tag}-${index}`}
            className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[10px] text-gray-700"
          >
            <Tag className="h-3 w-3" />
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

const BoardColumn = ({ column }: { column: Column }) => {
  return (
    <div className="w-[235px] shrink-0 rounded-lg bg-[#f5f5f5] p-2">
      {/* Column header */}
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <GripVertical className="h-3.5 w-3.5 text-gray-500" />

          <span className="text-[12px] font-semibold text-gray-800">
            {column.title}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Plus className="h-4 w-4 cursor-pointer text-gray-700 hover:text-black" />

          <MoreHorizontal className="h-4 w-4 cursor-pointer text-gray-500" />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add task */}
      <button className="mt-2 flex w-full items-center gap-2 px-2 py-2 text-[11px] font-medium text-gray-700 hover:text-black">
        <Plus className="h-3.5 w-3.5" />
        Add Task
      </button>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-[204px] shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Workspace */}
      <div className="flex h-[58px] items-center justify-between border-b border-gray-100 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-700 text-[9px] font-bold text-white">
            D
          </div>

          <span className="text-[13px] font-semibold text-gray-900">
            Dexter
          </span>
        </div>

        <ChevronsUpDown className="h-3.5 w-3.5 text-gray-700" />
      </div>

      {/* Navigation */}
      <div className="px-2 py-4">
        <div className="mb-2 flex items-center justify-between px-3">
          <span className="text-[12px] font-medium text-gray-700">
            Workspace
          </span>

          <ChevronDown className="h-3.5 w-3.5 text-gray-700" />
        </div>

        <nav className="space-y-1">
          <button className="flex w-full items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-left text-[12px] font-medium text-gray-900">
            <LayoutGrid className="h-4 w-4" />
            Tasks
          </button>

          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] text-gray-700 hover:bg-gray-50">
            <Folder className="h-4 w-4" />
            Projects
          </button>
        </nav>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="flex h-[62px] items-center justify-between border-b border-gray-200 bg-white px-5">
      {/* Page title */}
      <h1 className="text-[14px] font-semibold text-gray-900">
        Tasks
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
          <Search className="h-4 w-4 text-gray-700" />
        </button>

        <button className="flex h-8 items-center gap-1.5 rounded-md border border-gray-200 px-2.5 text-[11px] font-medium text-gray-700 hover:bg-gray-50">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Fields
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
          <SlidersHorizontal className="h-4 w-4 rotate-90 text-gray-700" />
        </button>

        <button className="flex h-8 items-center gap-1 rounded-md bg-black px-3 text-[11px] font-medium text-white hover:bg-gray-800">
          <Plus className="h-3.5 w-3.5" />
          Add Task
        </button>
      </div>
    </header>
  );
};

const TaskBoard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        <Header />

        {/* Board */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4">
          <div className="flex min-w-max items-start gap-3">
            {columns.map((column) => (
              <BoardColumn
                key={column.id}
                column={column}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskBoard;