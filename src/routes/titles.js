const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/titles', async (req, res) => {
    try{
        const rows = await pool.query('SELECT title FROM recetas');
        const arrayCadena = await convierteArrayCadenas(rows);
        res.json(arrayCadena);
    } catch(e){
        console.log(e);
    }
});

async function convierteArrayCadenas(rows){
    let cadena = JSON.stringify(rows);
    cadena = cadena.replace(/{\"title\":/g,'');
    cadena = cadena.replace(/}/g,"");
    let arrayCadena = JSON.parse(cadena);
    return arrayCadena;
}

module.exports = router;