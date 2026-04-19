const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// CREATE
router.post("/", async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();
  res.json(task);
});

// READ
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

// UPDATE
router.put("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

module.exports = router;