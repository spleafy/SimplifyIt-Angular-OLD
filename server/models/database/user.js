const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  workspaces: [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
