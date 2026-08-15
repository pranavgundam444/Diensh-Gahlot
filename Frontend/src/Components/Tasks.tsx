import { useState } from "react";
import Sidebar from "./Sidebar";
import TaskHeader from "./Header";
import BoardView from "./BoardView";
import ListView from "./ListView";
import AddTaskModal from "./AddTaskModal";

const Tasks = () => {
  const [view, setView] = useState<"board" | "list">("board");
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">

        <TaskHeader
          view={view}
          setView={setView}
          onAdd={() => setShowAdd(true)}
        />

        {showAdd && <AddTaskModal onClose={() => setShowAdd(false)} />}

        <div className="flex-1 overflow-auto p-4">
          {view === "board" ? (
            <BoardView />
          ) : (
            <ListView />
          )}
        </div>

      </main>
    </div>
  );
};

export default Tasks;