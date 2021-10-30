const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
  administrators: [String],
  users: [String],
  name: String,
  settings: {
    allowUsersToCreate: Boolean,
  },
});

const Workspace = mongoose.model("Workspace", WorkspaceSchema);

module.exports = Workspace;
