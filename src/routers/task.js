const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        res.status(404).json({ Error: "Task not found" });
      }
      res.send(task);
    })
    .catch((error) => {
      res.status(400).json({ Error: error });
    });
});

router.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((error) => {
      res.status(500).json({ Error: error });
    });
});

router.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((error) => {
      res.status(400).json({ Error: error });
    });
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      res.status(404).json({ Error: `${_id} not found` });
    }
    res.status(202).send(`${_id} has been deleted successfully`);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    res.status(400).json({ Error: "Invalid update request" });
  }

  try {
    const task = await Task.findById(req.params.id);

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    if (!task) {
      res.status(404).json({ Error: `Task ${req.params.id} not found` });
    }
    res.send(task);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

module.exports = router;
