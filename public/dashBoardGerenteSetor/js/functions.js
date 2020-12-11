var currentPage = 0;

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
    console.log(dadosBolsista);

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
    console.log(dadosBolsista);

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
        tableHeader2.innerHTML = data.getDay() + '/' + data.getMonth() +'/' + data.getFullYear();
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
    }
}

function formatHour(hourInt){
    let str = hourInt.toString();
    return str[0] + str[1] + ':' + str[2] + str[3];
}

//Geral
function loadMenu(){
    currentPage = 0;
    document.getElementById('backMenu').style.display ='flex';
    document.getElementById('tBack').style.display ='none';
}

function searchName(){
    let searchName = document.getElementById('nomePesquisa').value.toLowerCase();
    let table = document.getElementById('tBolsista');

    if(searchName == ''){
        for(let i = 1; i < table.children.length; i++){
            table.children[i].style.display = 'table-row';
        }
    }else{
        for(let i = 1; i < table.children.length; i++){
            if(!table.children[i].children[1].innerText.toLowerCase().includes(searchName)){
                table.children[i].style.display = 'none';
            }
        }
    }
}