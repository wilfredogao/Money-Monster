const express = require('express');
const db = require('../db/database');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  db.run(sql, [username, email, password], function(err) {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    res.send({ message: 'User created successfully', id: this.lastID });
  });
});

router.post('/login', (req, res) => {
  console.log("Entered");
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ?`;

  db.get(sql, [username], (err, user) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    if (user) {
      if (password === user.password) {
          res.send({ message: 'Login successful!' });
      } 
      else {
          res.send({ message: 'Password is incorrect' });
      };
    } else {
      res.send({ message: 'User not found' });
    }
  });
});

module.exports = router;
