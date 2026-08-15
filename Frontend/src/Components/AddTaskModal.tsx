import { useState } from 'react';
import * as taskService from '../services/taskService';

type Props = { onClose: () => void };

const AddTaskModal = ({ onClose }: Props) => {
  
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('To Do');
  const [priority, setPriority] = useState('No Priority');
  const [dueDate, setDueDate] = useState('');
  const [labels, setLabels] = useState('');

  const submit = async () => {
    setSubmitting(true);
    try {
      await taskService.createTask({ title, description, assignee, status, priority, dueDate, labels: labels.split(',').map(s => s.trim()).filter(Boolean) });
      // notify other components to refresh
      window.dispatchEvent(new Event('tasks:refresh'));
      onClose();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h3 className="mb-3 text-lg font-semibold">Add Task</h3>

        <div className="space-y-2">
          <input className="w-full rounded border px-3 py-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea className="w-full rounded border px-3 py-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <input className="w-full rounded border px-3 py-2" placeholder="Assignee" value={assignee} onChange={e => setAssignee(e.target.value)} />
          <div className="flex gap-2">
            <select value={status} onChange={e => setStatus(e.target.value)} className="flex-1 rounded border px-2 py-2">
              <option>To Do</option>
              <option>Doing</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value)} className="flex-1 rounded border px-2 py-2">
              <option>No Priority</option>
              <option>Urgent</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <input className="w-full rounded border px-3 py-2" placeholder="Due Date (YYYY-MM-DD)" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          <input className="w-full rounded border px-3 py-2" placeholder="Labels (comma separated)" value={labels} onChange={e => setLabels(e.target.value)} />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded px-3 py-2" onClick={onClose}>Cancel</button>
          <button className="rounded bg-black px-3 py-2 text-white" disabled={submitting} onClick={submit}>{submitting ? 'Adding...' : 'Add'}</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
