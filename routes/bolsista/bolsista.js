const express = require('express');
const mysql = require('mysql');
const promisify = require('../../DB/promisify');
const router = express.Router();
const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: "SigBolsista"
});

router.get('/', async (req, res) => {
    let sql = 'select id, nome, data_inicio, carga_horaria, setor from bolsista'
    let result = await promisify(dbCon, sql);
    // console.log(result);
    // dbCon.end();
    res.json({listaDeBolsista: result});
});

module.exports = router;