const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/signup', (req, res) => {
    const { username, email, password, retypePassword } = req.body;
    console.log('Received signup data:', { username, email, password, retypePassword });
    // Handle the signup logic here
    // You can save the data to your database or perform any necessary operations
    return res.json({ message: 'Signup successful' });
});

app.listen(8081, () => {
    console.log("Listening");
})