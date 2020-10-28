
const express = require('express');
let router = express.Router();

router.use('/login', (req, res) => {
    res.send("it works");
});

export { router };
