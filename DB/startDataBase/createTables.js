const promisify = require('../promisify');
const table = require('./tables');
const dbCon = require('../dbCon');

async function createTables(){
    await promisify(dbCon, table.unidade);
    await promisify(dbCon, table.gerenteUnidade);
    await promisify(dbCon, table.setor);
    await promisify(dbCon, table.gerenteSetor);
    await promisify(dbCon, table.maquina);
    await promisify(dbCon, table.bolsista);
    await promisify(dbCon, table.registro_ponto);
    await promisify(dbCon, table.justificativa);
    await promisify(dbCon, table.dia_justificativa);
    await promisify(dbCon, table.administrador);
    dbCon.end();
    process.exit();
};

try {
    createTables();
} catch (err) {
    console.log(err);
}
