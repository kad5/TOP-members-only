const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.findUserByUsername(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      console.log("its me");
      //return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.findUserById(id);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

function checkAcess(requiredLevel) {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl; //stores the original url the user was trying to get to and returns them to it on successful login
      console.log(req.session.returnTo);
      return res.redirect("/log-in");
    }

    if (req.user.auth_level >= requiredLevel) {
      return next();
    }
    const error = new Error("Access denied");
    error.status = 403;
    return next(error);
  };
}

module.exports = { passport, checkAcess };
