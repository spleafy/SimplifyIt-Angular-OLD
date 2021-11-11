const User = require("../../models/database/user");
const bcrypt = require("bcrypt");
const ResponseMessage = require("../../models/responseMessage");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const requestData = req.body;

  requestData.password = await bcrypt
    .hash(requestData.password, 10)
    .then((hash) => {
      return hash;
    });

  const userColors = ["#660066", "#ff9900", "#00cc00", "#0000cc", "#ff6699"];

  requestData.registrationDate = new Date();

  requestData.settings = {};

  requestData.settings.profilePicturePath = null;
  requestData.settings.profileColor =
    userColors[Math.floor(Math.random() * userColors.length)];

  try {
    const user = await new User(requestData).save();
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
    res.json(new ResponseMessage(200, { successful: true, token }));
  } catch (err) {
    console.error(err);
  }
};
