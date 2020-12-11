const express = require('express')
const path = require('path');
let router = express.Router();
const dbCon = require('../../DB/dbCon');
const promisify = require('../../DB/promisify');

router.get('/', (req, res) => {
    res.sendFile('registroPonto.html', {root: path.join(__dirname, '../../views/registroPonto')});
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        let sql =  "select * from registro_ponto where dia = '" + req.body.data + "' and bolsista = " + req.body.cpf ;
        let registroDeEntrada =  await promisify(dbCon, sql);

        if(registroDeEntrada.length == 0){
            let sqlInsert = "insert into registro_ponto values ('" + req.body.data + "'," + req.body.hora + ", null, " + req.body.cpf + ")"; 
            await promisify(dbCon, sqlInsert);
        }else{
            let sqlUpdate = "update registro_ponto set hora_saida = " + req.body.hora + " where dia = '" + req.body.data + "' and bolsista = " + req.body.cpf;
            await promisify(dbCon, sqlUpdate);
        }
        res.json({status: 'ok'});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
})

module.exports = router;