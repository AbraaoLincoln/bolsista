const mysql = require('mysql');
const profy = require('./promisify');
const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: "company"
});

async function t(){
    let sql = 'select * from EMPLOYEE';
    let r = await profy(dbCon, sql);
    console.log(r);
}

try{
    t()
}catch(err){
    console.log(err);
}