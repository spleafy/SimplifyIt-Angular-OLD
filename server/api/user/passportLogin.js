const passport = require("passport");
const jwt = require("jsonwebtoken");
const ResponseMessage = require("../../models/responseMessage");

require("dotenv").config();

module.exports = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(
        new ResponseMessage(400, { successful: false }, "Invalid Credentials!")
      );
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
      return res.json(new ResponseMessage(200, { successful: true, token }));
    });
  })(req, res, next);
};
