const jwt = require("jsonwebtoken");
const ResponseMessage = require("../../models/responseMessage");

require("dotenv").config();

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;

    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
      if (err) {
        res.json(new ResponseMessage(403, { token: "invalid" }));
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    res.json(new ResponseMessage(403, { token: "invalid" }));
  }
};
