import React, { useState, useCallback, useMemo } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  // ✅ State
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);

  // ✅ Add Task
  const addTask = useCallback((text) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text, completed: false },
    ]);
  }, []);

  // ✅ Delete Task
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // ✅ Drag & Drop Handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    setTasks(items);
  };

  // ✅ Filter Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "active") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div className={dark ? "dark app" : "app"}>
      <h1>Task Manager</h1>

      <ThemeToggle dark={dark} setDark={setDark} />

      {/* ✅ Pass function */}
      <TaskInput addTask={addTask} />

      <Filter setFilter={setFilter} />

      {/* ✅ Pass all required props */}
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default App;