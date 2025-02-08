const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const auth = require("../middleware/auth");

const logIn = asyncHandler(async (req, res) =>
  res.send("login attempt recieved")
);

const logOut = asyncHandler(async (req, res) => res.send("logging out"));

const renderAllmessages = asyncHandler(async (req, res) =>
  res.send("messages page")
);

const addMssage = asyncHandler(async (req, res) =>
  res.send("message recieved")
);

const renderDashboard = asyncHandler(async (req, res) =>
  res.send("dashboard page")
);

const updateInfo = asyncHandler(async (req, res) => res.send("info updated"));

const addNote = asyncHandler(async (req, res) => res.send("note recieved"));

module.exports = {
  logIn,
  logOut,
  renderAllmessages,
  addMssage,
  renderDashboard,
  updateInfo,
  addNote,
};
