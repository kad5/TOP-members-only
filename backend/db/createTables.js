require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE my_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  auth_level INTEGER NOT NULL CHECK (auth_level BETWEEN 1 AND 4),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  message TEXT NOT NULL,  -- Use TEXT for longer messages
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES my_users(id) ON DELETE CASCADE
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  note TEXT NOT NULL,  -- Use TEXT for longer notes
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES my_users(id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_user_id ON messages (user_id);
CREATE INDEX idx_notes_user_id ON notes (user_id);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.dbString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
