const API = import.meta.env.VITE_API_URL;

type TaskPayload = any;

async function handleRes(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function getTasks(search?: string) {
  const q = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${API}/tasks${q}`);
  return handleRes(res);
}

export async function getTask(id: string) {
  const res = await fetch(`${API}/tasks/${id}`);
  return handleRes(res);
}

export async function createTask(payload: TaskPayload) {
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}

export async function updateTask(id: string, payload: TaskPayload) {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}

export async function deleteTask(id: string) {
  const res = await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
  return handleRes(res);
}

export default { getTasks, getTask, createTask, updateTask, deleteTask };
