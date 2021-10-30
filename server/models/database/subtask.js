const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema({
  task_id: String,
  name: String,
  description: String,
});

const Subtask = mongoose.model("Subtask", SubtaskSchema);

module.exports = Subtask;
