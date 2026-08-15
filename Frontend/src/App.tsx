import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import Tasks from "./Components/Tasks";
import TaskDetails from "./Components/TaskDetails";
import Projects from "./Components/Projects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Tasks Page */}
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;