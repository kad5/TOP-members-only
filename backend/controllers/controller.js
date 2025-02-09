const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const passport = require("passport");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

const signUp = asyncHandler(async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  const isTaken = await db.checkUsername(username);
  if (isTaken) {
    return res.render("sign-up", {
      messages: [{ msg: "The username is already taken", path: "username" }],
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.addNewUser(username, hashedPassword, firstName, lastName);
  res.redirect("/log-in");
});

const logInGet = (req, res) => {
  const message = req.session.messages ? req.session.messages[0] : null; // get the fail message - passport saves the messages to req.session.messages
  req.session.messages = [];
  res.render("log-in", { message });
};

const logInPost = passport.authenticate("local", {
  successReturnToOrRedirect: "/dashboard",
  failureRedirect: "/log-in",
  failureMessage: true,
  keepSessionInfo: true, // unfortunatey returnToOrRedirect wont work without this
});

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

const renderAllmessages = asyncHandler(async (req, res) => {
  const { rows } = await db.getAllmessages();
  if (rows.length < 1) return res.render("messages", { messages: [] });
  res.render("messages", {
    isLoggedIn: req.isAuthenticated(),
    messages: rows,
  });
});

const addMssage = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const message = req.body.message;
  await db.addNewMessage(userId, message);
  res.redirect("/messages");
});

const renderDashboard = asyncHandler(async (req, res) => {
  const { password, ...data } = req.user;
  const notes = await db.findNotesByUserId(data.id);
  const messages = await db.findMessagesByUserId(data.id);
  res.render("dashboard", { data, notes: notes.rows, messages: messages.rows });
});
const renderSettings = asyncHandler(async (req, res) => {
  const { password, ...data } = req.user;
  const mistakes = [];
  res.render("settings", { data, mistakes });
});

const updateInfo = asyncHandler(async (req, res) => {
  const data = req.user;
  const newData = req.body;

  if (data.first_name !== newData.firstName) {
    await db.updateFirstName(data.id, newData.firstName);
  }
  if (data.last_name !== newData.lastName) {
    await db.updateLastName(data.id, newData.lastName);
  }
  if (data.auth_level !== newData.auth_level) {
    await db.updateAuthLevel(data.id, newData.auth_level);
  }

  res.redirect("/dashboard");
});

const addNote = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const note = req.body.note;
  await db.addNewNote(userId, note);
  res.redirect("/dashboard");
});

const updateNote = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { noteId, note } = req.body;
  const fetched = await db.findNoteById(noteId);
  const data = fetched.rows[0];
  if (data && data.user_id === userId) {
    await db.updateNote(noteId, note);
  }
  res.redirect("/dashboard");
});

module.exports = {
  signUp,
  logInPost,
  logInGet,
  logOut,
  renderAllmessages,
  addMssage,
  renderDashboard,
  renderSettings,
  updateInfo,
  addNote,
  updateNote,
};
