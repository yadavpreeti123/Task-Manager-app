import React, { useEffect, useState } from "react";

function TaskItem({ task, deleteTask }) {
  const [show, setShow] = useState(false);
  const [removing, setRemoving] = useState(false);

  // 🔥 Runs when component loads (for add animation)
  useEffect(() => {
    setShow(true);
  }, []);

  // 🔥 Runs when delete button is clicked
  const handleDelete = () => {
    setRemoving(true);

    // Wait for animation to finish
    setTimeout(() => {
      deleteTask(task.id);
    }, 300);
  };


  return (
    <li className="task-item">
      {task.text}
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default React.memo(TaskItem);