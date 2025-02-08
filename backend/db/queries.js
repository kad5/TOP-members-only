const pool = require("./pool");

// create
const addNewUser = (username, hashedPassword, firstName, lastName) =>
  pool.query(
    "INSERT INTO my_users (username, password, first_name, last_name, auth_level) VALUES ($1, $2, $3, $4, 1) RETURNING *",
    [username, hashedPassword, firstName, lastName]
  );
const addNewMessage = (userId, message) =>
  pool.query(
    "INSERT INTO messages (user_id, message) VALUES ($1, $2) RETURNING *",
    [userId, message]
  );
const addNewNote = (userId, note) =>
  pool.query("INSERT INTO notes (user_id, note) VALUES ($1, $2) RETURNING *", [
    userId,
    note,
  ]);

// read
const getAllusers = () => pool.query("SELECT * FROM my_users");
const getAllmessages = () => pool.query("SELECT * FROM messages");

const checkUsername = async (username) => {
  const user = await pool.query("SELECT * FROM my_users WHERE username = $1", [
    username,
  ]);
  return result.rows.length > 0;
};
const findUserByUsername = (username) =>
  pool.query("SELECT * FROM my_users WHERE username = $1", [username]);
const findUserById = (userId) =>
  pool.query("SELECT * FROM my_users WHERE id = $1", [userId]);

const findMessageById = (userId) =>
  pool.query("SELECT * FROM messages WHERE user_id = $1", [userId]);
const findNoteById = (userId) =>
  pool.query("SELECT * FROM notes WHERE user_id = $1", [userId]);

// update
const updateAuthLevel = (userId, newAuthLevel) =>
  pool.query("UPDATE my_users SET auth_level = $2 WHERE id = $1 RETURNING *;", [
    userId,
    newAuthLevel,
  ]);
const updateFirstName = (userId, newFirstName) =>
  pool.query("UPDATE my_users SET first_name = $2 WHERE id = $1 RETURNING *;", [
    userId,
    newFirstName,
  ]);
const updateLastName = (userId, newLastName) =>
  pool.query("UPDATE my_users SET last_name = $2 WHERE id = $1 RETURNING *;", [
    userId,
    newLastName,
  ]);
const updatePassword = (userId, newPassword) =>
  pool.query("UPDATE my_users SET password = $2 WHERE id = $1 RETURNING *;", [
    userId,
    newPassword,
  ]);
const updateNote = (userId, newNote) =>
  pool.query("UPDATE notes SET note = $2 WHERE id = $1 RETURNING *;", [
    userId,
    newNote,
  ]);

//delete
const deleteUser = (userId) =>
  pool.query("DELETE FROM my_users WHERE id = $1 RETURNING *;", [userId]);
const deleteMessage = (msgId) =>
  pool.query("DELETE FROM messages WHERE id = $1 RETURNING *;", [msgId]);
const deleteNote = (noteId) =>
  pool.query("DELETE FROM notes WHERE id = $1 RETURNING *;", [noteId]);

module.exports = {
  addNewUser,
  addNewMessage,
  addNewNote,
  getAllusers,
  getAllmessages,
  checkUsername,
  findUserByUsername,
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
