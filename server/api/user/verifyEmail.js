const User = require("../../models/database/user");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const email = req.query.email;
  if ((await User.find({ email })) == false) {
    res.json(new ResponseMessage(200, { registered: false }));
  } else {
    res.json(new ResponseMessage(200, { registered: true }));
  }
};
