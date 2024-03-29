const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    res.send('1');
})

router.get('/', (req, res) => {
    res.send("WORKING");
})

module.exports = router