const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");

// App Config

const upload = multer();

require("dotenv").config({
  path: "./config/.env",
});

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

require("./config/passport");

app.use(passport.initialize());

app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/SimplifyIt");

const db = mongoose.connection;

app.listen(4000);

// ----------------------------------------------------------------------------------- //

// Endpoints //

const verifyUsername = require("./api/user/verifyUsername");
const verifyToken = require("./api/middleware/verifyToken");
const passportLogin = require("./api/user/passportLogin");
const checkUserState = require("./api/user/checkUserState");
const registerUser = require("./api/user/registerUser");
const verifyEmail = require("./api/user/verifyEmail");
const getWorkspaces = require("./api/workspace/getWorkspaces");
const createWorkspace = require("./api/workspace/createWorkspace");
const deleteWorkspace = require("./api/workspace/deleteWorkspace");
const updateWorkspace = require("./api/workspace/updateWorkspace");
const addUserWorkspace = require("./api/workspace/addUserWorkspace");
const removeUserWorkspace = require("./api/workspace/removeUserWorkspace");
const addAdministratorWorkspace = require("./api/workspace/addAdministratorWorkspace");
const removeAdministratorWorkspace = require("./api/workspace/removeAdministratorWorkspace");
const getTask = require("./api/task/getTask");
const createTask = require("./api/task/createTask");
const deleteTask = require("./api/task/deleteTask");
const getSubtask = require("./api/subtask/getSubtask");
const createSubtask = require("./api/subtask/createSubtask");
const deleteSubtask = require("./api/subtask/deleteSubtask");

app.get("/api/user/verifyEmail", verifyEmail);

app.get("/api/user/verifyUsername", verifyUsername);

app.get("/api/user/checkUserState", verifyToken, checkUserState);

app.post("/api/user/login", upload.none(), passportLogin);

app.post("/api/user/register", upload.none(), registerUser);

app.get("/api/user/workspace", verifyToken, getWorkspaces);

app.post("/api/user/workspace", verifyToken, createWorkspace);

app.delete("/api/user/workspace/:workspaceId", verifyToken, deleteWorkspace);

app.put(
  "/api/user/workspace/:workspaceId",
  verifyToken,
  upload.none(),
  updateWorkspace
);

app.post(
  "/api/user/workspace/:workspaceId/user",
  verifyToken,
  upload.none(),
  addUserWorkspace
);

app.delete(
  "/api/user/workspace/:workspaceId/user",
  verifyToken,
  upload.none(),
  removeUserWorkspace
);

app.post(
  "/api/user/workspace/:workspaceId/administrator",
  verifyToken,
  upload.none(),
  addAdministratorWorkspace
);

app.delete(
  "/api/user/workspace/:workspaceId/administrator",
  verifyToken,
  upload.none(),
  removeAdministratorWorkspace
);

app.get("/api/user/workspace/:workspaceId/task", verifyToken, getTask);

app.post(
  "/api/user/workspace/:workspaceId/task",
  verifyToken,
  upload.none(),
  createTask
);

app.delete(
  "/api/user/workspace/:workspaceId/task/:taskId",
  verifyToken,
  deleteTask
);

app.get(
  "/api/user/workspace/:workspaceId/task/:taskId/subtask",
  verifyToken,
  getSubtask
);

app.post(
  "/api/user/workspace/:workspaceId/task/:taskId/subtask",
  verifyToken,
  upload.none(),
  createSubtask
);

app.delete(
  "/api/user/workspace/:workspaceId/task/:taskId/subtask",
  verifyToken,
  deleteSubtask
);

// ----------------------------------------------------------------------------------- //

// * TODO: Comment Endpoint Functions
