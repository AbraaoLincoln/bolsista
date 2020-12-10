const mysql = require('mysql');
const promisify = require('../promisify');
const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: "SigBolsista"
});

async function populate(){
    let sql1 = "insert into unidade values(1, 'IMD'), (2, 'CCET'), (3, 'CB')";
    let sql2 = "insert into gerenteUnidade values(38945131957, 'Rita Isabelle Rocha', 'senha123', 1), (35708942150, 'Mariah Elaine Aparecida Souza', '123senha', 2), (22073911404, 'Enrico Eduardo Kevin Monteiro', '123senhA321', 3)";
    let sql3 = "insert into setor values(1, 'TI', 1), (2, 'Inovacao', 1), (3, 'Desenvolvimento', 1)";
    let sql4 = "insert into gerenteSetor values(26180320985, 'Lucca Geraldo Benedito Assis', 'pasSenha112233', 1), (63154822526, 'Victor Bernardo Iago Lima', 'pass112233word', 2), (30938019406, 'Gabrielly Tânia Bárbara Moreira', '112233', 3)";
    let sql5 = " insert into bolsista values(79220104865, 'Isadora Betina Figueiredo', 'senha123', '2020-11-17', 0, 1), (42373216302, 'Yasmin Cláudia Lima', '123', '2020-02-15', 0, 1), (70087906350, 'Isabelle Allana Nunes', '123senha', '2020-10-22', 0, 2), (36345620726, 'Osvaldo Vicente Oliver da Silva', '123senha', '2020-01-25', 0, 2), (49699583274, 'Marcelo Felipe Peixoto', '123senha', '2020-02-13', 0, 3), (20880686359, 'Carlos Eduardo Marcos Vinicius Nogueira', '123senha4', '2020-08-20', 0, 3)";

    
    await promisify(dbCon,sql1);
    await promisify(dbCon,sql2);
    await promisify(dbCon,sql3);
    await promisify(dbCon,sql4);
    await promisify(dbCon,sql5);
    dbCon.end();
    process.exit();
}

try {
    populate();
} catch (err) {
    console.log(err);
}