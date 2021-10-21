const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;

    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};
