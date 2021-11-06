const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  workspaceId: {
    type: String,
    required: true,
  },
  parentId: String,
  creator: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  users: {
    type: [String],
    required: true,
  },
  administrators: {
    type: [String],
    required: true,
  },
  fromDate: Date,
  dueDate: Date,
  creationDate: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
