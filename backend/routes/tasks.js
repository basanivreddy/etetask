const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// GET tasks (only for logged user)
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
});

// CREATE task
router.post("/", auth, async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    user: req.userId,
  });

  await newTask.save();
  res.json(newTask);
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
