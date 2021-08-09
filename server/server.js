const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  let q = req.query.q;
  if (q == "validateEmail") {
    if (req.query.userEmail == "martinmpetrov@hotmail.com") {
      res.json({ status: 200 });
      return;
    }

    res.json(null);
    return;
  } else if (q == "loginUser") {
    if (
      req.query.userEmail == "martinmpetrov@hotmail.com" &&
      req.query.userPassword == "1234567890"
    ) {
      res.json({ status: 200 });
      return;
    } else {
      res.json(null);
      return;
    }
  }
});

app.listen(4000);
