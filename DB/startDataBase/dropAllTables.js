const promisify = require('../promisify');
const dbCon = require('../dbCon');

async function dropAllTables(){
    // let sql = 'show tables';
    // let tableNames = await promisify(dbCon, sql);
    // console.log(tableNames[0].Tables_in_SigBolsista);
    // for(let i = 0; i < tableNames.length; i++){
    //     dropTable(tableNames[i].Tables_in_SigBolsista);
    //     console.log(tableNames[i].Tables_in_SigBolsista);
    //     let sqlDrop = 'drop table ' + tableNames[i].Tables_in_SigBolsista;
    //     await promisify(dbCon, sqlDrop);
    // }
    // process.exit();
    await promisify(dbCon, 'drop table dia_justificativa');
    await promisify(dbCon, 'drop table justificativa');
    await promisify(dbCon, 'drop table registro_ponto');
    await promisify(dbCon, 'drop table bolsista');
    await promisify(dbCon, 'drop table maquina');
    await promisify(dbCon, 'drop table gerenteSetor');
    await promisify(dbCon, 'drop table setor');
    await promisify(dbCon, 'drop table gerenteUnidade');
    await promisify(dbCon, 'drop table unidade');
    await promisify(dbCon, 'drop table administrador');
    dbCon.end();
    process.exit();
};

async function dropTable(tableName){
    let sqlDrop = 'drop table ' + tableName;
    await promisify(dbCon, sqlDrop);
};

try {
    dropAllTables();
} catch (err) {
    console.log(err);
}
