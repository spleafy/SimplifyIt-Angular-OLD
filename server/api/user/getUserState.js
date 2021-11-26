const ResponseMessage = require("../../models/responseMessage");

module.exports = (req, res) => {
  const user = req.user;
  delete user.user.password;
  res.json(new ResponseMessage(200, user));
};
