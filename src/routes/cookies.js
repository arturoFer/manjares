const express = require('express');
const router = express.Router();

router.get('/cookies', (req, res) => {
    res.render('cookies', {
        style: 'cookies.css',
        javascript: 'cookies.js'
    });
});

module.exports = router;