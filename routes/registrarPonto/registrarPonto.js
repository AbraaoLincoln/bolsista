const express = require('express')
const path = require('path');
let router = express.Router();
const dbCon = require('../../DB/dbCon');
const promisify = require('../../DB/promisify');
const util = require('../../util/aux');

router.get('/registro', (req, res) => {
    res.sendFile('registroPonto.html', {root: path.join(__dirname, '../../views/registroPonto')});
});

router.get('/', async (req, res) => {
    try {
        let sql =  "select * from registro_ponto";
        let registroDePonto =  await promisify(dbCon, sql);
        res.json({status: 'ok', result: registroDePonto});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
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
            let r = await promisify(dbCon, "select carga_horaria from bolsista where id = " + req.body.cpf);
            let nova_carga_horaria = r[0].carga_horaria + util.calculateNewCargaHoraria(registroDeEntrada[0].hora_entrada, req.body.hora);
            sqlUpdate = "update bolsista set carga_horaria = " + nova_carga_horaria + " where id = " + req.body.cpf;
            await promisify(dbCon, sqlUpdate);
        }
        res.json({status: 'ok'});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
})

router.post('/completo', async (req, res) => {
    console.log(req.body);
    try {
        let sqlInsert = "insert into registro_ponto values ('"+ req.body.data + "'," + req.body.horaEntrada + "," + req.body.horaSaida + "," + req.body.cpf + ')';
        await promisify(dbCon, sqlInsert);
        let r = await promisify(dbCon, "select carga_horaria from bolsista where id = " + req.body.cpf);
        let nova_carga_horaria = r[0].carga_horaria + util.calculateNewCargaHoraria(req.body.horaEntrada, req.body.horaSaida);
        sqlUpdate = "update bolsista set carga_horaria = " + nova_carga_horaria + " where id = " + req.body.cpf;
        await promisify(dbCon, sqlUpdate);
        res.json({status: 'ok'});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
})

router.put('/', async (req, res) => {
    console.log(req.body);
    try {
        
        res.json({status: 'ok'});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
})

router.delete('/', async (req, res) => {
    console.log(req.body.listaDeRegistroToDelete);
    try {
        for(registro of req.body.listaDeRegistroToDelete){
            let sqlDelete = "delete from registro_ponto where dia = '" + registro.dia + "' and bolsista = " + registro.cpf;
            console.log(sqlDelete);
            await promisify(dbCon, sqlDelete);
        }
        res.json({status: 'ok'});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
});

module.exports = router;