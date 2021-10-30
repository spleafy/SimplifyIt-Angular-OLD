const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/database/user");

const customFields = {
  usernameField: "email",
};

const verifyCallback = (username, password, done) => {
  User.findOne({ email: username }, async (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return done(null, false);
    }

    return done(null, user);
  });
};

passport.use(new LocalStrategy(customFields, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
