import { LayoutGrid, List } from "lucide-react";

type FieldsMenuProps = {
  view: "board" | "list";
  setView: (view: "board" | "list") => void;
};

const FieldsMenu = ({
  view,
  setView,
}: FieldsMenuProps) => {
  const fields = [
    { name: "Priority", checked: false },
    { name: "Members", checked: true },
    { name: "Due Date", checked: false },
    { name: "Labels", checked: true },
    { name: "Status", checked: false },
    { name: "Reporter", checked: false },
  ];

  return (
    <div className="absolute right-4 top-[52px] z-50 w-[205px] rounded-xl border border-gray-200 bg-white p-2 shadow-lg">

      {/* List / Board */}
      <div className="mb-3 flex overflow-hidden rounded-lg border border-gray-200">

        <button
          onClick={() => setView("list")}
          className={`flex flex-1 items-center justify-center gap-1 py-2 text-[11px] ${
            view === "list"
              ? "bg-gray-50 font-medium"
              : ""
          }`}
        >
          <List className="h-3 w-3" />
          List
        </button>

        <button
          onClick={() => setView("board")}
          className={`flex flex-1 items-center justify-center gap-1 py-2 text-[11px] ${
            view === "board"
              ? "bg-gray-50 font-medium"
              : ""
          }`}
        >
          <LayoutGrid className="h-3 w-3" />
          Board
        </button>

      </div>

      {/* Fields */}
      {fields.map((field) => (
        <div
          key={field.name}
          className="flex items-center justify-between px-1 py-1.5 text-[11px]"
        >
          <span>{field.name}</span>

          <div
            className={`flex h-3.5 w-3.5 items-center justify-center rounded ${
              field.checked
                ? "bg-black"
                : "bg-gray-200"
            }`}
          >
            {field.checked && (
              <span className="text-[9px] text-white">
                ✓
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FieldsMenu;