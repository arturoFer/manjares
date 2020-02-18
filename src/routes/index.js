const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async (req, res) => {
    const recetas = await pool.query('SELECT posicion, title FROM recetas ORDER BY posicion DESC');
    res.render('index', { 
        recetas,
        style: "listado.css",
        javascript: "listado.js",
     });
});

module.exports = router;