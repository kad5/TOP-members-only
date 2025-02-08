const pool = require("./pool");

// create
const addNewUser = async (username, password, firstName, lastName) =>
  await pool.query(
    "INSERT INTO my_users (username, password, first_name, last_name, auth_level) VALUES ($1, $2, $3, $4, 1) RETURNING *",
    [username, password, firstName, lastName]
  );

const addNewMessage = async (userId, message) =>
  await pool.query(
    "INSERT INTO messages (user_id, message) VALUES ($1, $2) RETURNING *",
    [userId, message]
  );
const addNewNote = async (userId, note) =>
  await pool.query(
    "INSERT INTO notes (user_id, note) VALUES ($1, $2) RETURNING *",
    [userId, note]
  );

// read
const getAllusers = async () => await pool.query("SELECT * FROM my_users");
const getAllmessages = async () => await pool.query("SELECT * FROM messages");

const findUserById = async (userId) =>
  await pool.query("SELECT * FROM my_users WHERE id = $1", [userId]);
const findMessageById = async (userId) =>
  await pool.query("SELECT * FROM messages WHERE user_id = $1", [userId]);
const findNoteById = async (userId) =>
  await pool.query("SELECT * FROM notes WHERE user_id = $1", [userId]);

// update
const updateAuthLevel = async (userId, newAuthLevel) =>
  await pool.query(
    "UPDATE my_users SET auth_level = $2 WHERE id = $1 RETURNING *;",
    [userId, newAuthLevel]
  );
const updateFirstName = async (userId, newFirstName) =>
  await pool.query(
    "UPDATE my_users SET first_name = $2 WHERE id = $1 RETURNING *;",
    [userId, newFirstName]
  );
const updateLastName = async (userId, newLastName) =>
  await pool.query(
    "UPDATE my_users SET last_name = $2 WHERE id = $1 RETURNING *;",
    [userId, newLastName]
  );
const updatePassword = async (userId, newPassword) =>
  await pool.query(
    "UPDATE my_users SET password = $2 WHERE id = $1 RETURNING *;",
    [userId, newPassword]
  );
const updateNote = async (userId, newNote) =>
  await pool.query("UPDATE notes SET note = $2 WHERE id = $1 RETURNING *;", [
    userId,
    newNote,
  ]);

//delete
const deleteUser = async (userId) =>
  await pool.query("DELETE FROM my_users WHERE id = $1 RETURNING *;", [userId]);
const deleteMessage = async (msgId) =>
  await pool.query("DELETE FROM messages WHERE id = $1 RETURNING *;", [msgId]);
const deleteNote = async (noteId) =>
  await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *;", [noteId]);

module.exports = {
  addNewUser,
  addNewMessage,
  addNewNote,
  getAllusers,
  getAllmessages,
  findUserById,
  findMessageById,
  findNoteById,
  updateAuthLevel,
  updateFirstName,
  updateLastName,
  updatePassword,
  updateNote,
  deleteUser,
  deleteMessage,
  deleteNote,
};
