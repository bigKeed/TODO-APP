const express = require("express");
const Task = require("../Models/task");
require("dotenv").config();

exports.getTasks = async (req, res) => {
  const userId = req.userId;
  console.log(`user with id:${userId} tasks are;`);

  const tasks = await Task.find({ userId });
  res.render("tasks", { tasks });
  console.log("Fetched tasks", tasks);
};

exports.editTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.render("edit", { task });
  } catch (err) {
    return res.status(500).send("Error retrieving task");
  }
};

exports.createTasks = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.userId;
  try {
    const newTask = new Task({
      userId,
      title,
      description,
      status,
      user: req.session.userId,
    });
    await newTask.save();
    console.log("Saving new tasks:", newTask);
    res.redirect("/tasks"); // Redirect to the task list after creation
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const editTask = await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      status,
    });
    console.log("Updating new details", editTask);
    res.redirect("/tasks");
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteTask = async (req, res) => {
  console.log("Delete request received");

  const taskId = req.params.id;

  console.log("Fetching blog with ID:", taskId);

  try {
    await Task.findByIdAndDelete(taskId);
    res.redirect("/tasks");
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal Server Error");
  }
};
