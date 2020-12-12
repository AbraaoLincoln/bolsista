// 0 = pagina principal
// 1 = gerenciamento de bolsista
// 2 = gerenciamento de ponto
// 3 = gerenciamento de justificativa
// 4 = gerenciamento de maquina de ponto
// 5 = gerenciamento de setor
// 6 = gerenciamento de unidade
var currentPage = 0;
// var tableRows = [];

function logout(){
    alert("Esse butão não faz nada!")
}

async function carregarBolsista(){
    try {
        currentPage = 1;
        let rawData = await fetch('http://localhost:3000/bolsista');
        let res = await rawData.json();
        // console.log(res.listaDeBolsista);
        createTableBolsistas(res.listaDeBolsista);
        document.getElementById('backMenu').style.display ='none';
        document.getElementById('tBack').style.display ='flex';
    } catch (err) {
        console.log(err)
    }
}

function createTableBolsistas(listaDeBolsistas){
    // tableRows = [];
    let atributes = ['CPF', 'Nome', 'Data Inicio', 'Carga Horaria', 'Setor'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(atr of atributes){
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atr;
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);
    table.appendChild(tableRow1);

    for(bolsista of listaDeBolsistas){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', showEditBolsista)
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = bolsista.id;
        let tableHeader2 = document.createElement('td');
        tableHeader2.innerHTML = bolsista.nome;
        tableHeader2.className = 'tdNome';
        let tableHeader3 = document.createElement('td');
        let data = new Date(bolsista.data_inicio);
        tableHeader3.innerHTML = data.getDay() + '/' + data.getMonth() +'/' + data.getFullYear();
        let tableHeader4 = document.createElement('td');
        tableHeader4.innerHTML = bolsista.carga_horaria;
        let tableHeader5 = document.createElement('td');
        tableHeader5.innerHTML = bolsista.setor;
        let tableHeader6 = document.createElement('input');
        tableHeader6.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableRow.appendChild(tableHeader3);
        tableRow.appendChild(tableHeader4);
        tableRow.appendChild(tableHeader5);
        tableRow.appendChild(tableHeader6);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}

function hideForm(){
    document.getElementById('bForms').style.display = 'none';
}

function hideForms(){
    document.getElementById('addForm').style.display = 'none';
    document.getElementById('updateForm').style.display = 'none';
    document.getElementById('addFormPonto').style.display = 'none';
    document.getElementById('updateFormPonto').style.display = 'none';
}

function showAddForm(){
    document.getElementById('bForms').style.display = 'flex';
    hideForms();
    if(currentPage == 1){
        document.getElementById('addForm').style.display = 'flex';
    }else if(currentPage == 2){
        document.getElementById('addFormPonto').style.display = 'flex';
    }
}

function showEditBolsista(event){
    document.getElementById('bForms').style.display = 'flex';
    hideForms();
    document.getElementById('updateForm').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateCpfBol').value = dadosBolsista[0].innerText;
    document.getElementById('updateNomebol').value = dadosBolsista[1].innerText;
    document.getElementById('updateDataIncBol').value = dadosBolsista[2].innerText;
    document.getElementById('updateSetorBol').value = dadosBolsista[3].innerText;
}

function showEditRegistroPonto(event){
    console.log(event.target.parentNode);
    document.getElementById('bForms').style.display = 'flex';
    hideForms();
    document.getElementById('updateFormPonto').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateCpfBolPonto').value = dadosBolsista[0].innerText;
    document.getElementById('updateNomebolPonto').value = dadosBolsista[1].innerText;
    document.getElementById('updateHoraIncBolPonto').value = dadosBolsista[2].innerText;
    document.getElementById('updateHoraSaidaBolPonto').value = dadosBolsista[3].innerText;
}

//Tabela Registro de Ponto
async function carregarRegistroPonto(){
    try {
        currentPage = 2;
        let rawData = await fetch('http://localhost:3000/ponto');
        let res = await rawData.json();
        createTableRegistroPonto(res.result);
        document.getElementById('backMenu').style.display ='none';
        document.getElementById('tBack').style.display ='flex';
    } catch (err) {
        console.log(err)
    }
}

function createTableRegistroPonto(listaDeRegistro){
    // tableRows = [];
    let atributes = ['CPF', 'Dia', 'Hora Inicio', 'Hora Saida'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(atr of atributes){
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atr;
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);

    table.appendChild(tableRow1);

    for(registro of listaDeRegistro){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', showEditRegistroPonto)
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = registro.bolsista;
        let tableHeader2 = document.createElement('td');
        let data = new Date(registro.dia);
        tableHeader2.innerHTML = data.getDate() + '/' + (data.getMonth() + 1) +'/' + data.getFullYear();
        // tableHeader2.innerHTML = registro.dia;
        let tableHeader3 = document.createElement('td');
        tableHeader3.innerHTML = formatHour(registro.hora_entrada);
        let tableHeader4 = document.createElement('td');
        tableHeader4.innerHTML = formatHour(registro.hora_saida);
        let tableHeader5 = document.createElement('input');
        tableHeader5.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableRow.appendChild(tableHeader3);
        tableRow.appendChild(tableHeader4);
        tableRow.appendChild(tableHeader5);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}

function formatHour(hourInt){
    if(hourInt){
        let str = hourInt.toString();
        return str[0] + str[1] + ':' + str[2] + str[3];
    }
}

//Geral
function loadMenu(){
    if(currentPage == 5){
        document.getElementById('row1').style.display = 'flex';
        document.getElementById('row2').style.display = 'flex';
        document.getElementById('row3').style.display = 'none';
    }else if(currentPage == 6){
        document.getElementById('row1').style.display = 'flex';
        document.getElementById('row2').style.display = 'flex';
        document.getElementById('row4').style.display = 'none';
    }else{
        document.getElementById('backMenu').style.display ='flex';
        document.getElementById('tBack').style.display ='none';
    }
    currentPage = 0;
}

function searchName(){
    let searchName = document.getElementById('nomePesquisa').value.toLowerCase();
    let table = document.getElementById('tBolsista');

    for(let i = 1; i < table.children.length; i++){
        if(!table.children[i].children[1].innerText.toLowerCase().includes(searchName)){
            table.children[i].style.display = 'none';
        }else{
            table.children[i].style.display = 'table-row';
        }
    }
}

// function searchName(){
//     let searchName = document.getElementById('nomePesquisa').value.toLowerCase();
//     console.log(tableRows);

//     for(let i = 0; i < tableRows.length; i++){
//         if(!tableRows[i].children[1].innerText.toLowerCase().includes(searchName)){
//             tableRows[i].style.display = 'none';
//             console.log(searchName);
//         }else{
//             tableRows[i].style.display = 'table-row';
//         }
//     }
// }

function add(){
    if(currentPage == 1){

    }else if(currentPage == 2){
        registrarPontoCompletoNoBD();
    }
}


function deleteAll(){
    let table = document.getElementById('tBolsista');
    let tLength = table.children[0].children.length
    let itensToDelete = []
    for(let i = 1; i < table.children.length; i++){
        if(table.children[i].children[tLength -1].checked){
            let obj = {
                cpf: table.children[i].children[0].innerText,
                dia: formatDateMysql(table.children[i].children[1].innerText)
            }
            itensToDelete.push(obj);
        }
    }

    if(currentPage == 1){

    }else if(currentPage == 2){
        deleteRegistroDePontoNoBD(itensToDelete);
    }
    
}

function formatDateMysql(dataToFormat){
    let splitDate = dataToFormat.split('/');
    return splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
}

async function registrarPontoCompletoNoBD(){
    let registroPonto = {
        cpf: document.getElementById('cpfBolPonto').value,
        data: formatDateMysql(document.getElementById('diabolPonto').value),
        horaEntrada: document.getElementById('horaIncBolPonto').value,
        horaSaida: document.getElementById('horaSaidaBolPonto').value
    }

    try {
        let rawData = await fetch('http://localhost:3000/ponto/completo', {
           method: "POST",
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(registroPonto) 
        });
        let res = await rawData.json();
        if(res.status == 'ok'){
            alert('Ponto Registrado com sucesso!');
        }else{
            alert('Erro ao registrar o ponto tente novamente mais tarde!');
        }
    } catch (err) {
      console.log(err);  
    }

}


async function deleteRegistroDePontoNoBD(listaDeRegistro){
    try {
        let rawData = await fetch('http://localhost:3000/ponto', {
           method: "DELETE",
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify({listaDeRegistroToDelete: listaDeRegistro}) 
        });
        let res = await rawData.json();
        if(res.status == 'ok'){
            alert('Itens deletados com sucesso!');
        }else{
            alert('Erro ao deletar os itens selecionados tente novamente mais tarde!');
        }
    } catch (err) {
      console.log(err);  
    }
}

function showSetorMenu(){
    document.getElementById('row1').style.display = 'none';
    document.getElementById('row2').style.display = 'none';
    document.getElementById('row3').style.display = 'flex';
    currentPage = 5;
}

function showUnidadeMenu(){
    document.getElementById('row1').style.display = 'none';
    document.getElementById('row2').style.display = 'none';
    document.getElementById('row4').style.display = 'flex';
    currentPage = 6;
}