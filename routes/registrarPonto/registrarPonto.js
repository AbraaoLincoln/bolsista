const express = require('express')
const path = require('path');
const router = express.Router();
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
            if(parseInt(req.body.hora) >= parseInt(registroDeEntrada[0].hora_entrada)){
                let sqlUpdate = "update registro_ponto set hora_saida = " + req.body.hora + " where dia = '" + req.body.data + "' and bolsista = " + req.body.cpf;
                await promisify(dbCon, sqlUpdate);
                let r = await promisify(dbCon, "select carga_horaria from bolsista where cpf = " + req.body.cpf);
                let nova_carga_horaria = r[0].carga_horaria + util.calculateNewCargaHoraria(registroDeEntrada[0].hora_entrada, req.body.hora);
                sqlUpdate = "update bolsista set carga_horaria = " + nova_carga_horaria + " where cpf = " + req.body.cpf;
                await promisify(dbCon, sqlUpdate);
            }else{
                res.json({status: 'error'});
            }
        }
        res.json({status: 'ok'});
    } catch (err) {
        console.log(err);
        res.json({status: 'error'});
    }
})

router.post('/completo', async (req, res) => {
    console.log(req.body);
    if(parseInt(req.body.horaEntrada) <= parseInt(req.body.horaSaida)){
        try {
            let sqlInsert = "insert into registro_ponto values ('"+ req.body.data + "'," + req.body.horaEntrada + "," + req.body.horaSaida + "," + req.body.cpf + ')';
            await promisify(dbCon, sqlInsert);
            let r = await promisify(dbCon, "select carga_horaria from bolsista where cpf = " + req.body.cpf);
            let nova_carga_horaria = r[0].carga_horaria + util.calculateNewCargaHoraria(req.body.horaEntrada, req.body.horaSaida);
            sqlUpdate = "update bolsista set carga_horaria = " + nova_carga_horaria + " where cpf = " + req.body.cpf;
            await promisify(dbCon, sqlUpdate);
            res.json({status: 'ok'});
        } catch (err) {
            console.log(err);
            res.json({status: 'error'});
        }
    }else{
        console.log('asda')
        res.json({status: 'error'});
    }
})

router.put('/', async (req, res) => {
    try {
        console.log(req.body);
        let cargaOldPonto = 0;
        let newCpf = 0;
        let newData = '';

        if(req.body.novaCargaH){
            // console.log('update carga')
            let sql =  "select * from registro_ponto where dia = '" + req.body.data + "' and bolsista = " + req.body.cpf ;
            let registroDePonto =  await promisify(dbCon, sql);
            cargaOldPonto = util.calculateNewCargaHoraria(registroDePonto[0].hora_entrada, registroDePonto[0].hora_saida);
            // console.log(cargaOldPonto);
        }

        let sqlUpdate = "update registro_ponto set ";
        for(let i = 0; i < req.body.listaDeAtributos.length; i++){
            if(i == 0){
                sqlUpdate += util.formatAtribute(req.body.listaDeAtributos[i].atr) + " = " + req.body.listaDeAtributos[i].val;
            }else{
                sqlUpdate += ", "+ util.formatAtribute(req.body.listaDeAtributos[i].atr) + " = " + req.body.listaDeAtributos[i].val;
            }
            
            if(util.formatAtribute(req.body.listaDeAtributos[i].atr) == 'bolsista'){
                newCpf = req.body.listaDeAtributos[i].val;
            }

            if(util.formatAtribute(req.body.listaDeAtributos[i].atr) == 'dia'){
                newData = req.body.listaDeAtributos[i].val;
            }
        }
        // console.log(newCpf + '--' + newData);
        sqlUpdate += " where dia = '" + req.body.data + "' and bolsista = " + req.body.cpf;
        // console.log(sqlUpdate);
        let rUpd = await promisify(dbCon, sqlUpdate);
        // console.log(rUpd.changedRows);
        if(rUpd.changedRows){
            // console.log('test1')
            if(req.body.novaCargaH){
                let r = await promisify(dbCon, "select carga_horaria from bolsista where cpf = " + req.body.cpf);
                // console.log(r[0].carga_horaria)
                let nova_carga_horaria = r[0].carga_horaria - cargaOldPonto;
                // console.log('test11' + "--" + nova_carga_horaria);
                sqlUpdate = "update bolsista set carga_horaria = " + nova_carga_horaria + " where cpf = " + req.body.cpf;
                let aux = await promisify(dbCon, sqlUpdate);
                // console.log(aux);
                let sql = "select * from registro_ponto where dia = " + (newData ? newData : req.body.data) + " and bolsista = " + (newCpf ? newCpf : req.body.cpf) ;
                // console.log("sql-" + sql);
                let registroDePonto =  await promisify(dbCon, sql);
                // console.log(registroDePonto);
                r = await promisify(dbCon, "select carga_horaria from bolsista where cpf = " + (newCpf ? newCpf : req.body.cpf));
                nova_carga_horaria = r[0].carga_horaria + util.calculateNewCargaHoraria(registroDePonto[0].hora_entrada, registroDePonto[0].hora_saida);
                // console.log('test12' + "--" + nova_carga_horaria);
                sqlUpdate = "update bolsista set carga_horaria = " + nova_carga_horaria + " where cpf = " + (newCpf ? newCpf : req.body.cpf);
                await promisify(dbCon, sqlUpdate);
            }
            res.json({status: 'ok'});
        }else{
            res.json({status: 'error'});    
        }
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