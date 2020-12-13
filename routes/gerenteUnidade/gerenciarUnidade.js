const express = require('express')
// const path = require('path');
let router = express.Router();
const promisify = require('../../DB/promisify');
const dbCon = require('../../DB/dbCon');

router.get('/gerentes', async (req, res) => {
    try {
        let sql = 'select cpf, nome, unidadeGerencia from gerenteUnidade';
        let result = await promisify(dbCon, sql);
        res.json({status: 'ok', listaGerentes: result});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
});

router.get('/unidades', async (req, res) => {
    try {
        let sql = 'select * from unidade;';
        let result = await promisify(dbCon, sql);
        res.json({status: 'ok', listaUnidades: result});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
});

module.exports = router;