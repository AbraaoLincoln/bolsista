const mysql = require('mysql');
const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: "SigBolsista"
});

module.exports = dbCon;