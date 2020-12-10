const mysql = require('mysql');
const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123'
});

dbCon.connect(err => {
    if (err) console.log(err);
    let createDbSQL = 'CREATE DATABASE SigBolsista'
    dbCon.query(createDbSQL, (err, result) => {
        if(err) console.log(err);
        console.log('Bando de Dados SigBolsista criado...');
    });
});