const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Set up the database connection
const dbDir = path.join(__dirname, '');  // Path to the db directory
const dbPath = path.join(dbDir, 'mydb.sqlite3'); // Path to the database file

// Ensure the db directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`Database directory created at ${dbDir}`);
}

// Connect to the SQLite database or create it if it doesn't exist
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(`Could not connect to database: ${err.message}`);
  } else {
    console.log(`Connected to the SQLite database at ${dbPath}`);
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      budget DECIMAL(10, 2),
      totalExpenses DECIMAL(10, 2)
    )`, (err) => {
      if (err) {
        console.log('Error when creating the users table:', err);
      } else {
        console.log('Users table created or already exists');
      }
    });
  }
});

module.exports = db;
