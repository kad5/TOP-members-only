const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const passport = require("passport");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

// login or signup for logged in users redirects to dashboard

const signUp = asyncHandler(async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  const isTaken = await db.checkUsername(username);
  if (isTaken) {
    return res.status(400).send("The username is already taken.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.addNewUser(username, hashedPassword, firstName, lastName);
  res.redirect("/log-in");
});

const logInGet = [
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect(req.session.returnTo || "/dashboard");
    }
    next();
  },
  (req, res) => {
    const message = req.session.messages ? req.session.messages[0] : null; // get the fail message - passport saves the messages to req.session.messages
    req.session.messages = [];
    res.render("log-in", { message });
  },
];

const logInPost = [
  passport.authenticate("local", {
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
  (req, res) => {
    const returnTo = req.session.returnTo || "/dashboard"; // redirect to saved URL or default being dashboard
    delete req.session.returnTo;
    res.redirect(returnTo);
  },
];

const logOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const renderAllmessages = asyncHandler(async (req, res) =>
  res.send("messages page")
);

const addMssage = asyncHandler(async (req, res) =>
  res.send("message recieved")
);

const renderDashboard = asyncHandler(async (req, res) =>
  res.render("dashboard")
);

const updateInfo = asyncHandler(async (req, res) => res.send("info updated"));

const addNote = asyncHandler(async (req, res) => res.send("note recieved"));

module.exports = {
  signUp,
  logInPost,
  logInGet,
  logOut,
  renderAllmessages,
  addMssage,
  renderDashboard,
  updateInfo,
  addNote,
};
