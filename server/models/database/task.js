const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  workspace_id: String,
  parent_id: String,
  name: String,
  description: String,
  creator: String,
  users: [String],
  fromDate: Date,
  dueDate: Date,
  creationDate: Date,
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
