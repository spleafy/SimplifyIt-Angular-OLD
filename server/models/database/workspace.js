const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
  administrators: [String],
  users: [String],
  name: String,
  tasks: [String],
});

const Workspace = mongoose.model("Workspace", WorkspaceSchema);

module.exports = Workspace;
