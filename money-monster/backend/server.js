const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

//Design for database uses code that's been modified from https://www.youtube.com/watch?v=ZRYn6tgnEgM

const sqlite3 = require("sqlite3").verbose();


let sql;

//connect to DB
const db = new sqlite3.Database("./moneyusers.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

// sql = `CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT, budget INTEGER, monster, time INTEGER)`;
// db.run(sql);

//future: have some form of check if budget went over or not (would that be a database thing)?
//TODO: get current id of user currently signed in (SELECT id FROM users WHERE email = [written email]). Store that so user data can be updated. 


//insert data into table :
// sql = `INSERT INTO users (id, email, password, budget, monster, time) VALUES(NULL,?,?,?,?,?)`;
// db.run(
//   sql,
//   ["test@gmail.com", "password", "400,000", "?????", "21"],
//   (err) => {
//     if (err) return console.error(err.message);
//   }
// );

// //update data :
// sql = `UPDATE users SET first_name = ? WHERE id = ?`;
// db.run(sql, ["Jake", 1], (err) => {
//   if (err) return console.error(err.message);
// });

// //Delete data :
// sql = `DELETE FROM USERS WHERE id = ?`;
// db.run(sql, [1], (err) => {
//   if (err) return console.error(err.message);
// });







app.use(cors());
app.use(bodyParser.json());

app.post('/api/signup', (req, res) => {
    const { username, email, password, retypePassword } = req.body;
    console.log('Received signup data:', { username, email, password, retypePassword });
    sql = `INSERT INTO users (id, email, password, budget, monster, time) VALUES(NULL,?,?,?,?,?)`;
db.run(
  sql,
  [username, password, "400,000", "?????", "21"],
  (err) => {
    if (err) return console.error(err.message);
  }
);
    // Handle the signup logic here
    //querying the data :
sql = `SELECT * FROM users`;
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach((row) => {
    console.log(row);
  });
});
    // You can save the data to your database or perform any necessary operations
    return res.json({ message: 'Signup successful' });
    //querying the data :
});

app.listen(8081, () => {
    console.log("Listening");
})

//sql lite