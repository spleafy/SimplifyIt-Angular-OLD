const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer();
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");

const verifyToken = require("./services/verifyToken");
const passportLogin = require("./services/passportLogin");

const ResponseMessage = require("./models/responseMessage");

require("dotenv").config();

// Models
const User = require("./models/database/user");

const app = express();

app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

require("./config/passport");

app.use(passport.initialize());

app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/SimplifyIt");

const db = mongoose.connection;

app.get("/api/user/verifyEmail", async (req, res) => {
  const email = req.query.userEmail;
  if ((await User.find({ email })) == false) {
    res.json(new ResponseMessage(200, { registered: false }));
  } else {
    res.json(new ResponseMessage(200, { registered: true }));
  }
});

app.get("/api/user/verifyUsername", async (req, res) => {
  const username = req.query.userUsername;
  if ((await User.find({ username })) == false) {
    res.json(new ResponseMessage(200, { registered: false }));
  } else {
    res.json(new ResponseMessage(200, { registered: true }));
  }
});

app.post("/api/user/login", upload.none(), (req, res, next) => {
  passportLogin(req, res, next);
});

app.get("/api/user/post", verifyToken, (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

app.post("/api/user/register", upload.none(), async (req, res) => {
  const requestData = req.body;

  requestData.password = await bcrypt
    .hash(requestData.password, 10)
    .then((hash) => {
      return hash;
    });

  requestData.registrationDate = new Date();

  try {
    const user = await new User(req.body).save();
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
    res.json(new ResponseMessage(200, { successfull: true, token }));
  } catch (err) {
    console.error(err);
  }
});

app.listen(4000);
