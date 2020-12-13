const express = require('express')
const path = require('path');
let router = express.Router();
const promisify = require('../../DB/promisify');
const dbCon = require('../../DB/dbCon');

router.get('/', (req, res) => {
    res.sendFile('gerenciametoSetor.html', {root: path.join(__dirname, '../../views/dashBoardGerenteSetor')});
});

router.get('/gerentes', async (req, res) => {
    try {
        let sql = 'select cpf, nome, setorGerencia from gerenteSetor';
        let result = await promisify(dbCon, sql);
        res.json({status: 'ok', listaGerentes: result});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
});

router.get('/setores', async (req, res) => {
    try {
        let sql = 'select * from setor;';
        let result = await promisify(dbCon, sql);
        res.json({status: 'ok', listaSetores: result});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
});

module.exports = router;