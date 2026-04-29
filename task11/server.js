const express = require("express");

const mongoose = require("mongoose");

const Task = require("./models/task");

const app = express();

app.use(express.json());

app.use(express.static("public"));

mongoose

  .connect("mongodb://127.0.0.1:27017/taskdb")

  .then(() => {
    console.log("Database connected");
  })

  .catch((err) => {
    console.log(err);
  });

// CREATE

app.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,

    completed: false,
  });

  await task.save();

  res.send(task);
});

// READ

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();

  res.send(tasks);
});

// UPDATE - mark task as done

app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,

    { completed: true },

    { new: true },
  );

  res.send(task);
});

// DELETE

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.send("Task deleted");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
