const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).json({ Error: error });
    });
});

router.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).json({ Error: error });
    });
});

router.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ Error: "User not found" });
      }
      res.send(user);
    })
    .catch((error) => {
      res.status(400).json({ Error: error });
    });
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    res.status(400).json({ Error: "Invalid update request!" });
  }

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();

    if (!user) {
      res.status(404).json({ Error: `User ${req.params.id} not found` });
    }
    res.send(user);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      res.status(404).json({ Error: `User ${_id} not found` });
    }
    res.status(202).send(`User ${_id} has been deleted successfully`);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (error) {
    res.status(400).json({ Error: "Invalid email or password" });
  }
});

module.exports = router;
