const express = require('express');
const router = express.Router();

router.get('/favoritos', (req, res) => {
    res.render('favoritos', {
        style: 'favoritos.css',
        javascript: 'favoritos.js'
    });
});

module.exports = router;