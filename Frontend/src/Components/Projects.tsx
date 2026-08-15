import Sidebar from "./Sidebar";
import TaskHeader from "./Header";
import { useMemo, useState } from "react";

type Project = {
  id: number;
  name: string;
  priority: string;
  lead: string;
  status: string;
};

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Design Homepage",
    priority: "High",
    lead: "Ankit",
    status: "Backlog",
  },
  {
    id: 2,
    name: "Develop Login Feature",
    priority: "Low",
    lead: "CN",
    status: "Doing",
  },
  {
    id: 3,
    name: "Test Payment Gateway",
    priority: "Medium",
    lead: "Ankit",
    status: "Completed",
  },
];

const priorityStyles: Record<string, string> = {
  "No Priority": "text-gray-400",
  Urgent: "text-red-500",
  High: "text-orange-500",
  Medium: "text-yellow-500",
  Low: "text-blue-400",
};

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);

  const [search, setSearch] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const [visibleColumns, setVisibleColumns] = useState({
    priority: true,
    lead: true,
    status: true,
    actions: true,
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPriority =
        selectedPriority === "All" ||
        project.priority === selectedPriority;

      return matchesSearch && matchesPriority;
    });
  }, [projects, search, selectedPriority]);

  const addProject = () => {
    const name = window.prompt("Enter project name");

    if (!name?.trim()) return;

    const newProject: Project = {
      id: Date.now(),
      name: name.trim(),
      priority: "No Priority",
      lead: "You",
      status: "Backlog",
    };

    setProjects((current) => [...current, newProject]);
  };

  const deleteProject = (id: number) => {
    setProjects((current) =>
      current.filter((project) => project.id !== id)
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1 bg-white text-[13px] text-gray-800">

        {/* SHARED HEADER */}
        <TaskHeader
          title="Projects"
          onAdd={addProject}
        />

        {/* TABLE */}
        <div className="px-3 pt-4">
          <div className="overflow-visible rounded-lg border border-gray-200">

            {/* TABLE HEADER */}
            <div
              className="grid items-center border-b border-gray-200 bg-gray-50/60 px-3 py-2.5 text-xs font-medium text-gray-500"
              style={{
                gridTemplateColumns: `${"minmax(250px,1fr)"} ${
                  visibleColumns.priority ? "150px" : ""
                } ${
                  visibleColumns.lead ? "140px" : ""
                } ${
                  visibleColumns.status ? "140px" : ""
                } ${
                  visibleColumns.actions ? "40px" : ""
                }`,
              }}
            >
              <span>Projects</span>

              {visibleColumns.priority && (
                <span>Priority</span>
              )}

              {visibleColumns.lead && (
                <span>Lead</span>
              )}

              {visibleColumns.status && (
                <span>Status</span>
              )}

              {visibleColumns.actions && (
                <span></span>
              )}
            </div>

            {/* PROJECT ROWS */}
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group grid min-h-[42px] items-center border-b border-gray-100 px-3 text-xs last:border-b-0 hover:bg-gray-50"
                style={{
                  gridTemplateColumns: `${"minmax(250px,1fr)"} ${
                    visibleColumns.priority ? "150px" : ""
                  } ${
                    visibleColumns.lead ? "140px" : ""
                  } ${
                    visibleColumns.status ? "140px" : ""
                  } ${
                    visibleColumns.actions ? "40px" : ""
                  }`,
                }}
              >
                {/* PROJECT */}
                <div className="flex items-center gap-2 text-gray-800">
                  <span className="h-3.5 w-3.5 rounded border border-gray-300" />

                  <span>{project.name}</span>
                </div>

                {/* PRIORITY */}
                {visibleColumns.priority && (
                  <span
                    className={`flex items-center gap-1 ${
                      priorityStyles[project.priority]
                    }`}
                  >
                    ▴ {project.priority}
                  </span>
                )}

                {/* LEAD */}
                {visibleColumns.lead && (
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[9px]">
                      {project.lead.charAt(0)}
                    </span>

                    <span className="text-gray-500">
                      {project.lead}
                    </span>
                  </div>
                )}

                {/* STATUS */}
                {visibleColumns.status && (
                  <span className="text-gray-500">
                    {project.status}
                  </span>
                )}

                {/* ACTIONS */}
                {visibleColumns.actions && (
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="rounded p-1 text-gray-300 opacity-0 hover:bg-gray-100 hover:text-gray-600 group-hover:opacity-100"
                  >
                    ⋯
                  </button>
                )}
              </div>
            ))}

            {/* ADD PROJECT */}
            <button
              onClick={addProject}
              className="flex w-full items-center gap-2 px-3 py-3 text-xs text-gray-400 hover:bg-gray-50"
            >
              + Add Projects
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;