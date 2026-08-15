import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as taskService from '../services/taskService';

const statusOptions = ['Backlog', 'To Do', 'Doing', 'Completed', 'On Hold'];
const priorityOptions = ['No Priority', 'Urgent', 'High', 'Medium', 'Low'];

const priorityColor: Record<string, string> = {
  'No Priority': 'text-gray-400',
  Urgent: 'text-red-500',
  High: 'text-orange-500',
  Medium: 'text-yellow-500',
  Low: 'text-blue-400',
};

const statusColor: Record<string, string> = {
  Backlog: 'text-orange-500',
  'To Do': 'text-gray-500',
  Doing: 'text-blue-500',
  Completed: 'text-green-500',
  'On Hold': 'text-purple-500',
};

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>(null);

  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    taskService
      .getTask(id)
      .then((t) => {
        setTask(t);

        setForm({
          title: t.title || '',
          description: t.description || '',
          status: t.status || 'Backlog',
          priority: t.priority || 'No Priority',
          assignee: t.assignee || '',
          dueDate: t.dueDate || '',
          labels: (t.labels || []).join(', '),
        });
      })
      .catch((err) => {
        setError(err.message || 'Unable to load task');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const refreshTask = async () => {
    if (!id) return;

    const updatedTask = await taskService.getTask(id);

    setTask(updatedTask);

    setForm({
      title: updatedTask.title || '',
      description: updatedTask.description || '',
      status: updatedTask.status || 'Backlog',
      priority: updatedTask.priority || 'No Priority',
      assignee: updatedTask.assignee || '',
      dueDate: updatedTask.dueDate || '',
      labels: (updatedTask.labels || []).join(', '),
    });
  };

  const changeStatus = async (status: string) => {
    try {
      await taskService.updateTask(id!, { status });
      setShowStatusMenu(false);
      await refreshTask();
      window.dispatchEvent(new Event('tasks:refresh'));
    } catch {
      alert('Failed to update status');
    }
  };

  const changePriority = async (priority: string) => {
    try {
      await taskService.updateTask(id!, { priority });
      setShowPriorityMenu(false);
      await refreshTask();
      window.dispatchEvent(new Event('tasks:refresh'));
    } catch {
      alert('Failed to update priority');
    }
  };

  const saveTask = async () => {
    try {
      await taskService.updateTask(id!, {
        ...form,
        labels: form.labels
          .split(',')
          .map((label: string) => label.trim())
          .filter(Boolean),
      });

      setEditing(false);
      await refreshTask();

      window.dispatchEvent(new Event('tasks:refresh'));
    } catch {
      alert('Failed to update task');
    }
  };

  const deleteCurrentTask = async () => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await taskService.deleteTask(id!);
      window.dispatchEvent(new Event('tasks:refresh'));
      navigate('/tasks');
    } catch {
      alert('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-white text-sm text-gray-500">
        Loading task...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-full items-center justify-center bg-white">
        <div className="text-center">
          <p className="mb-3 text-sm text-red-500">{error}</p>
          <button
            onClick={() => navigate('/tasks')}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Back to tasks
          </button>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-full items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Task not found.</p>
      </div>
    );
  }

  const labels = task.labels || [];

  return (
    <div className="flex h-full min-h-screen flex-col bg-white text-[13px] text-gray-800">
      {/* TOP BAR */}
      <div className="flex h-12 items-center justify-between border-b border-gray-200 px-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/tasks')}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            title="Back"
          >
            ←
          </button>

          <div className="flex items-center gap-2 text-gray-400">
            <span>Tasks</span>
            <span>/</span>
            <span className="max-w-[250px] truncate text-gray-700">
              {task.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="rounded-md px-2 py-1.5 text-gray-500 hover:bg-gray-100">
            🔒
          </button>

          <button className="rounded-md px-2 py-1.5 text-gray-500 hover:bg-gray-100">
            👁
          </button>

          <button
            onClick={() => setEditing((value) => !value)}
            className="rounded-md px-2 py-1.5 text-gray-500 hover:bg-gray-100"
          >
            ✎
          </button>

          <button
            onClick={deleteCurrentTask}
            className="rounded-md px-2 py-1.5 text-gray-500 hover:bg-red-50 hover:text-red-500"
          >
            ⋯
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* CENTER CONTENT */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[900px] px-8 py-8">
            {/* TITLE */}
            <div className="mb-5">
              {editing ? (
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full border-b border-gray-300 bg-transparent pb-2 text-[26px] font-semibold outline-none focus:border-gray-800"
                />
              ) : (
                <h1 className="text-[26px] font-semibold tracking-tight text-gray-900">
                  {task.title}
                </h1>
              )}

              {editing ? (
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={2}
                  className="mt-3 w-full resize-none rounded-md border border-gray-200 p-2 text-sm text-gray-600 outline-none focus:border-gray-400"
                />
              ) : (
                <p className="mt-2 max-w-[700px] text-sm leading-6 text-gray-500">
                  {task.description ||
                    'Create clear and concise API documentation to guide developers in using the inventory and sales metrics effectively.'}
                </p>
              )}
            </div>

            {/* PROPERTIES */}
            <div className="mb-7">
              <div className="mb-2 text-xs font-medium text-gray-400">
                Properties
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* STATUS */}
                <div className="relative">
                  <button
                    onClick={() => setShowStatusMenu((v) => !v)}
                    className="flex items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50"
                  >
                    <span className={statusColor[task.status] || 'text-gray-500'}>
                      ●
                    </span>
                    <span>{task.status || 'Backlog'}</span>
                    <span className="text-gray-400">⌄</span>
                  </button>

                  {showStatusMenu && (
                    <div className="absolute left-0 top-full z-30 mt-1 w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-xl">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => changeStatus(status)}
                          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs hover:bg-gray-50"
                        >
                          <span className={statusColor[status]}>●</span>
                          {status}
                          {task.status === status && (
                            <span className="ml-auto">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* PRIORITY */}
                <div className="relative">
                  <button
                    onClick={() => setShowPriorityMenu((v) => !v)}
                    className="flex items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50"
                  >
                    <span className={priorityColor[task.priority]}>
                      ▴
                    </span>
                    <span>{task.priority || 'No Priority'}</span>
                    <span className="text-gray-400">⌄</span>
                  </button>

                  {showPriorityMenu && (
                    <div className="absolute left-0 top-full z-30 mt-1 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-xl">
                      {priorityOptions.map((priority) => (
                        <button
                          key={priority}
                          onClick={() => changePriority(priority)}
                          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs hover:bg-gray-50"
                        >
                          <span className={priorityColor[priority]}>
                            ▴
                          </span>
                          {priority}
                          {task.priority === priority && (
                            <span className="ml-auto">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* DESIGNER */}
                <button className="rounded-md border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50">
                  ◉ Designer
                </button>

                {/* DUE DATE */}
                <button className="rounded-md border border-gray-200 px-2.5 py-1.5 text-xs text-red-500 hover:bg-gray-50">
                  ◷ {task.dueDate || '31 Jul'}
                </button>
              </div>
            </div>

            {/* LABELS */}
            <section className="mb-7">
              <div className="mb-2 text-xs font-medium text-gray-400">
                Labels
              </div>

              <div className="flex flex-wrap gap-2">
                {(labels.length
                  ? labels
                  : ['Research', 'Design', 'Development', 'Testing', 'Deployment']
                ).map((label: string) => (
                  <span
                    key={label}
                    className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
                  >
                    ◇ {label}
                  </span>
                ))}
              </div>
            </section>

            {/* RESOURCES */}
            <section className="mb-8">
              <div className="mb-2 text-xs font-medium text-gray-400">
                Resources
              </div>

              <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600">
                🔗 Add document or link...
              </button>
            </section>

            {/* SUBTASKS */}
            <section className="mb-9">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-gray-500">⌄</span>
                  Subtasks
                </div>

                <button className="rounded-md px-2 py-1 text-gray-400 hover:bg-gray-100">
                  ⋯
                </button>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <div className="grid grid-cols-[1fr_110px_120px_120px_40px] border-b bg-gray-50/70 px-3 py-2.5 text-xs text-gray-400">
                  <span>Task</span>
                  <span>Priority</span>
                  <span>Members</span>
                  <span>Due Date</span>
                  <span></span>
                </div>

                {[
                  {
                    name: 'Subtask 1',
                    priority: 'High',
                    member: '👤',
                    date: '12 Sep 2026',
                  },
                  {
                    name: 'Subtask 2',
                    priority: 'Low',
                    member: 'CN',
                    date: '15 Sep 2026',
                  },
                  {
                    name: 'Subtask 3',
                    priority: 'Medium',
                    member: '+',
                    date: '18 Sep 2026',
                  },
                ].map((subtask) => (
                  <div
                    key={subtask.name}
                    className="grid grid-cols-[1fr_110px_120px_120px_40px] items-center border-b border-gray-100 px-3 py-2.5 text-xs last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded border border-gray-300"></span>
                      <span>{subtask.name}</span>
                    </div>

                    <span className={priorityColor[subtask.priority]}>
                      ▴ {subtask.priority}
                    </span>

                    <span className="text-gray-500">
                      {subtask.member}
                    </span>

                    <span className="text-gray-500">{subtask.date}</span>

                    <button className="text-gray-400">⋯</button>
                  </div>
                ))}

                <button className="flex w-full items-center gap-2 px-3 py-3 text-xs text-gray-400 hover:bg-gray-50">
                  + Add Subtasks
                </button>
              </div>
            </section>

            {/* COMMENTS */}
            <section className="mb-8">
              <div className="mb-4 text-sm font-medium">Subtasks</div>

              <div className="mb-3 flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs">
                  A
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium">You</span>
                    <span className="text-[11px] text-gray-400">
                      just now
                    </span>
                  </div>

                  <div className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
                    {task.description || 'Add a comment or update...'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5">
                <input
                  placeholder="Leave a reply..."
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400"
                />

                <button className="text-gray-400 hover:text-gray-700">
                  @
                </button>

                <button className="text-gray-400 hover:text-gray-700">
                  ➤
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-3">
                <input
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400"
                />

                <button className="text-gray-400">⌕</button>
                <button className="text-gray-400">➤</button>
              </div>
            </section>
          </div>
        </main>

        {/* RIGHT DETAILS PANEL */}
        <aside className="hidden w-[285px] shrink-0 overflow-y-auto border-l border-gray-200 bg-white xl:block">
          <div className="p-5">
            {/* DETAILS */}
            <div className="mb-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-medium text-gray-500">
                  Details
                </h3>

                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-gray-700">
                    +
                  </button>
                  <button className="text-gray-400 hover:text-gray-700">
                    ⚙
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* STATUS */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Status</span>

                  <div className="relative">
                    <button
                      onClick={() => setShowStatusMenu((v) => !v)}
                      className={`flex items-center gap-1 text-xs ${
                        statusColor[task.status] || 'text-gray-500'
                      }`}
                    >
                      ● {task.status || 'Backlog'}
                      <span className="text-gray-400">⌄</span>
                    </button>
                  </div>
                </div>

                {/* PRIORITY */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Priority</span>

                  <button
                    onClick={() => setShowPriorityMenu((v) => !v)}
                    className={`flex items-center gap-1 text-xs ${
                      priorityColor[task.priority] || 'text-gray-400'
                    }`}
                  >
                    ▴ {task.priority || 'No Priority'}
                    <span className="text-gray-400">⌄</span>
                  </button>
                </div>

                {/* ASSIGNEE */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Members</span>

                  <div className="flex items-center gap-1.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-[10px]">
                      {task.assignee
                        ? task.assignee.charAt(0).toUpperCase()
                        : '+'}
                    </span>

                    {task.assignee && (
                      <span className="max-w-[100px] truncate text-xs">
                        {task.assignee}
                      </span>
                    )}
                  </div>
                </div>

                {/* DATE */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Due date</span>

                  <span className="text-xs text-gray-600">
                    {task.dueDate || 'No date'}
                  </span>
                </div>

                {/* LABELS */}
                <div className="flex items-start justify-between">
                  <span className="text-xs text-gray-400">Labels</span>

                  <div className="flex max-w-[150px] flex-wrap justify-end gap-1">
                    {labels.length ? (
                      labels.map((label: string) => (
                        <span
                          key={label}
                          className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px]"
                        >
                          {label}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">None</span>
                    )}
                  </div>
                </div>

                {/* TEAMS */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Teams</span>
                  <span className="text-xs text-gray-500">—</span>
                </div>

                {/* REPORTER */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Reporter</span>
                  <span className="text-xs text-gray-600">You</span>
                </div>
              </div>
            </div>

            {/* UPDATES */}
            <div className="border-t border-gray-100 pt-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-medium text-gray-500">
                  Updates
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px]">
                    A
                  </div>

                  <div>
                    <p className="text-[11px] leading-4 text-gray-500">
                      <span className="font-medium text-gray-700">
                        You
                      </span>{' '}
                      changed priority from No Priority to{' '}
                      <span className="text-orange-500">High</span>
                    </p>

                    <p className="mt-1 text-[10px] text-gray-400">
                      just now
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px]">
                    A
                  </div>

                  <div>
                    <p className="text-[11px] leading-4 text-gray-500">
                      <span className="font-medium text-gray-700">
                        You
                      </span>{' '}
                      posted an update
                    </p>

                    <p className="mt-1 text-[10px] text-gray-400">
                      Aug 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* EDIT FOOTER */}
      {editing && (
        <div className="sticky bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
          <button
            onClick={() => setEditing(false)}
            className="rounded-md px-3 py-2 text-xs text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>

          <div className="flex gap-2">
            <button
              onClick={deleteCurrentTask}
              className="rounded-md border border-red-200 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
            >
              Delete
            </button>

            <button
              onClick={saveTask}
              className="rounded-md bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-800"
            >
              Save changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;