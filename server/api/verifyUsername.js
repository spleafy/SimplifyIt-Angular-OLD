const User = require("../models/database/user");

const ResponseMessage = require("../models/responseMessage");

module.exports = async (req, res) => {
  const username = req.query.username;
  if ((await User.find({ username })) == false) {
    res.json(new ResponseMessage(200, { registered: false }));
  } else {
    res.json(new ResponseMessage(200, { registered: true }));
  }
};
