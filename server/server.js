const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

// CREATE
app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: Date.now(), // unique id (number)
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.json(newTask);
});

// READ
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// DELETE (FIXED)
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id); // 🔥 IMPORTANT FIX

  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: "Deleted successfully" });
});

// UPDATE (TOGGLE COMPLETE)
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id); // 🔥 IMPORTANT FIX

  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  res.json({ message: "Updated successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});