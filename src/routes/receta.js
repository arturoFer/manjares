const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let rows = await pool.query('SELECT title, videoId, description FROM recetas WHERE posicion = ?', [id]);
        let receta = rows[0];
        receta.description = receta.description.replace(/\\n/g, '\n');
        res.render('receta', {
            receta,
            style: "receta.css",
            javascript: "receta.js"
        });
    } catch(e) {
        console.log(e);
    }
    
});

module.exports = router;