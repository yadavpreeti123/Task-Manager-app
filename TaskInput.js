import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!text.trim()) {
      setError("Task cannot be empty!");
      return;
    }

    addTask(text);     // ✅ PASS VALUE HERE
    setText("");       // clear input
    setError("");      // clear error
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleAdd}>Add Task</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TaskInput;