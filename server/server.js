const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");

// App Config //

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

const verifyUsername = require("./api/verifyUsername");
const verifyToken = require("./api/middleware/verifyToken");
const passportLogin = require("./api/passportLogin");
const checkUserState = require("./api/checkUserState");
const registerUser = require("./api/registerUser");
const verifyEmail = require("./api/verifyEmail");

app.get("/api/user/verifyEmail", verifyEmail);

app.get("/api/user/verifyUsername", verifyUsername);

app.post("/api/user/login", upload.none(), passportLogin);

app.get("/api/user/checkUserState", verifyToken, checkUserState);

app.post("/api/user/register", upload.none(), registerUser);

// ----------------------------------------------------------------------------------- //
