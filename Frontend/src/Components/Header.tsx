import {
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import FieldsMenu from "./FieldsMenu";

type TaskHeaderProps = {
  title?: "Tasks" | "Projects";
  view?: "board" | "list";
  setView?: (view: "board" | "list") => void;
  onAdd?: () => void;
};

const TaskHeader = ({
  title = "Tasks",
  view = "list",
  setView,
  onAdd,
}: TaskHeaderProps) => {
  const [showFields, setShowFields] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isProjects = title === "Projects";

  return (
    <div className="relative flex h-[62px] items-center justify-between border-b border-gray-200 px-4">

      {/* TITLE */}
      <h1 className="text-[14px] font-semibold text-gray-900">
        {title}
      </h1>

      {/* ACTIONS */}
      <div className="flex items-center gap-2">

        {/* SEARCH */}
        <div className="relative">
          <button
            onClick={() => setShowSearch((s) => !s)}
            className={`flex h-8 w-8 items-center justify-center rounded-md border ${
              showSearch
                ? "border-gray-300 bg-gray-50"
                : "border-gray-200"
            } hover:bg-gray-50`}
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {showSearch && (
            <div className="absolute right-0 top-10 z-50 w-[220px] rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              <input
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    window.dispatchEvent(
                      new CustomEvent(
                        isProjects
                          ? "projects:search"
                          : "tasks:search",
                        {
                          detail: {
                            search: searchValue,
                          },
                        }
                      )
                    );

                    setShowSearch(false);
                  }
                }}
                className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-[12px] outline-none focus:border-gray-400"
                placeholder={`Search ${title.toLowerCase()}...`}
              />

              <div className="mt-2 flex justify-end gap-2">
                <button
                  className="px-2 py-1 text-[12px] text-gray-500 hover:text-gray-900"
                  onClick={() => {
                    setSearchValue("");

                    window.dispatchEvent(
                      new CustomEvent(
                        isProjects
                          ? "projects:search"
                          : "tasks:search",
                        {
                          detail: {
                            search: "",
                          },
                        }
                      )
                    );

                    setShowSearch(false);
                  }}
                >
                  Clear
                </button>

                <button
                  className="rounded-md bg-black px-3 py-1 text-[12px] text-white hover:bg-gray-800"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent(
                        isProjects
                          ? "projects:search"
                          : "tasks:search",
                        {
                          detail: {
                            search: searchValue,
                          },
                        }
                      )
                    );

                    setShowSearch(false);
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FIELDS */}
        <button
          onClick={() => setShowFields((prev) => !prev)}
          className={`flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[11px] ${
            showFields
              ? "border-gray-300 bg-gray-50"
              : "border-gray-200"
          } hover:bg-gray-50`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Fields
        </button>

        {/* FILTER */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
          title="Filter"
        >
          <Filter className="h-4 w-4" />
        </button>

        {/* ADD */}
        <button
          onClick={() => onAdd?.()}
          className="flex h-8 items-center gap-1 rounded-md bg-black px-3 text-[11px] text-white hover:bg-gray-800"
        >
          <Plus className="h-3.5 w-3.5" />
          {isProjects ? "Add Project" : "Add Task"}
        </button>
      </div>

      {/* FIELDS MENU */}
      {showFields && setView && (
        <FieldsMenu
          view={view}
          setView={setView}
        />
      )}
    </div>
  );
};

export default TaskHeader;