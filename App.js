import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (taskName.trim() === "") {
      alert("Task name cannot be empty!");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      dueDate,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setDueDate("");
    setPriority("Low");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1 className="header">Task Tracker</h1>

      {/* Add Task Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="select"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={addTask} className="button">
          Add Task
        </button>
      </div>

      {/* Filter Options */}
      <div className="filters">
        <button onClick={() => setFilter("All")} className="filter-button">
          All
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className="filter-button"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("Pending")}
          className="filter-button"
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="checkbox"
              />
              <span
                className={`task-name ${
                  task.completed ? "completed" : ""
                }`}
              >
                {task.name}
              </span>
              <span className="due-date">
                ({task.dueDate || "No Due Date"})
              </span>
              <span className="priority">{task.priority}</span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
