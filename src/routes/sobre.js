const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
    res.render('sobre', {
        style: 'sobre.css',
        javascript: 'sobre.js'
    });
});

module.exports = router;