const express = require('express');
const db = require('../db/database');
const crypto = require('crypto'); // Node.js built-in module to generate random strings

const router = express.Router();

// Simple in-memory token store
const userTokens = {};

// Generate a simple token
function generateToken() {
    return crypto.randomBytes(16).toString('hex');
}

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  db.run(sql, [username, email, password], function(err) {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    const token = generateToken(); // Generate a token for the new user
    userTokens[token] = this.lastID; // Store token with user ID in memory
    res.send({ message: 'User created successfully', id: this.lastID, token: token });
  });
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = ?`;

    db.get(sql, [username], (err, user) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }
        if (user) {
          if (password === user.password) {
            const token = generateToken();
            userTokens[token] = user.id; // Store user id associated with the token
            res.send({ message: 'Login successful!', token: token });
          }
          else {
            res.send({ message: 'Password is incorrect' });
          }
        }
        else {
          res.send({ message: 'User not found' });
        }
    });
});

router.delete('/delete-account', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assume token is sent in Authorization header

    if (userTokens[token]) {
        const userId = userTokens[token];
        const sql = `DELETE FROM users WHERE id = ?`;

        db.run(sql, [userId], function(err) {
            if (err) {
                return res.status(500).send({ error: 'Failed to delete user' });
            }
            if (this.changes > 0) {
                delete userTokens[token]; // Remove token from memory
                res.send({ message: 'User deleted successfully' });
            } else {
                res.status(404).send({ error: 'User not found' });
            }
        });
    } else {
        res.status(401).send({ message: 'Invalid or expired token' });
    }
});

router.post('/update-budget', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !userTokens[token]) {
      return res.status(401).send({ message: 'Invalid or expired token' });
  }
  const userId = userTokens[token];
  const { budget } = req.body;
  const sql = `UPDATE users SET budget = ? WHERE id = ?`;

  db.run(sql, [budget, userId], function(err) {
      if (err) {
          console.error("Error updating budget:", err);
          return res.status(500).send({ error: 'Failed to update budget' });
      }
      res.send({ message: 'Budget updated successfully' });
  });
});

router.post('/add-expense', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !userTokens[token]) {
      return res.status(401).send({ message: 'Invalid or expired token' });
  }
  const userId = userTokens[token];
  const { amount } = req.body;
  const sql = `Update users SET totalExpenses = ? WHERE id = ?`;

  db.run(sql, [amount, userId], function(err) {
      if (err) {
        console.error("Error updating expense:", err);
        return res.status(500).send({ error: err.message });
      }
      res.send({ message: 'Expense added successfully' });
  });
});

// Get user budget and expenses
router.get('/user-data', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !userTokens[token]) {
      return res.status(401).send({ message: 'Invalid or expired token' });
  }
  const userId = userTokens[token];
  const sql = `SELECT budget, totalExpenses FROM users WHERE id = ?`;

  db.get(sql, [userId], (err, row) => {
      if (err) {
          return res.status(500).send({ error: err.message });
      }
      if (row) {
          res.json({
              budget: row.budget,
              totalExpenses: row.totalExpenses
          });
      } else {
          res.status(404).send({ message: 'User not found' });
      }
  });
});


module.exports = router;
