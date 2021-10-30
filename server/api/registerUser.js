const User = require("../models/database/user");
const bcrypt = require("bcrypt");
const ResponseMessage = require("../models/responseMessage");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
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
    res.json(new ResponseMessage(200, { successful: true, token }));
  } catch (err) {
    console.error(err);
  }
};
