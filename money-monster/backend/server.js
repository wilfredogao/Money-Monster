const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());


app.get("/api", (req, res) => {
    return res.json({message: "This is from the backend"});
})

app.listen(8081, () => {
    console.log("Listening");
})