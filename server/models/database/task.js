const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  workspace_id: String,
  administrators: [String],
  name: String,
  subtasks: [String],
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
