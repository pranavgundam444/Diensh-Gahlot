import { useEffect, useState, useCallback } from "react";
import * as taskService from "../services/taskService";

type Priority = "No Priority" | "Urgent" | "High" | "Medium" | "Low";

type RawTask = {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  tags: string[];
  raw: any;
};

export type Column = {
  id: number;
  title: string;
  tasks: RawTask[];
};

const STATUS_TITLES = ["To Do", "Doing", "Completed", "On Hold"];

export function useTasks() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (search?: string) => {
    setLoading(true);
    setError(null);

    try {
      const tasks = await taskService.getTasks(search);

      // Explicitly type the grouped columns so tasks is not inferred as never[]
      const grouped: Column[] = STATUS_TITLES.map((title, idx) => ({
        id: idx + 1,
        title,
        tasks: [],
      }));

      tasks.forEach((t: any) => {
        const mapped: RawTask = {
          id: t._id,
          title: t.title,
          assignee: t.assignee || "",
          dueDate: t.dueDate
            ? new Date(t.dueDate).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
              })
            : "",
          priority: (t.priority || "No Priority") as Priority,
          tags: t.labels || [],
          raw: t,
        };

        const col = grouped.find((c) => c.title === t.status) || grouped[0];

        col.tasks.push(mapped);
      });

      setColumns(grouped);
    } catch (err: any) {
      setError(err.message || "Unable to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const refreshHandler = () => fetchTasks();

    const searchHandler = (e: any) => fetchTasks(e?.detail?.search || "");

    window.addEventListener("tasks:refresh", refreshHandler);
    window.addEventListener("tasks:search", searchHandler as EventListener);

    return () => {
      window.removeEventListener("tasks:refresh", refreshHandler);
      window.removeEventListener(
        "tasks:search",
        searchHandler as EventListener,
      );
    };
  }, [fetchTasks]);

  const create = async (payload: any) => {
    const res = await taskService.createTask(payload);
    await fetchTasks();
    return res;
  };

  const update = async (id: string, payload: any) => {
    const res = await taskService.updateTask(id, payload);
    await fetchTasks();
    return res;
  };

  const remove = async (id: string) => {
    const res = await taskService.deleteTask(id);
    await fetchTasks();
    return res;
  };

  return {
    columns,
    loading,
    error,
    fetchTasks,
    create,
    update,
    remove,
  };
}
