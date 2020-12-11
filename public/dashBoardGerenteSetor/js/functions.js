function logout(){
    alert("Esse butão não faz nada!")
}

async function carregarBolsista(){
    try {
        let rawData = await fetch('http://localhost:3000/bolsista');
        let res = await rawData.json();
        console.log(res.listaDeBolsista);
        createTable(res.listaDeBolsista);
        document.getElementById('backMenu').style.display ='none';
        document.getElementById('tBack').style.display ='flex';
    } catch (err) {
        console.log(err)
    }
}

function createTable(listaDeBolsistas){
    let table = document.getElementById('tBolsista');
    let tableRow1 = document.createElement('tr');
    let tableHeader1 = document.createElement('th');
    tableHeader1.innerHTML = 'CPF';
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Nome';
    let tableHeader3 = document.createElement('th');
    tableHeader3.innerHTML = 'Data Inicio';
    let tableHeader4 = document.createElement('th');
    tableHeader4.innerHTML = 'Carga Horaria';
    let tableHeader5 = document.createElement('th');
    tableHeader5.innerHTML = 'Setor';
    let tableHeader6 = document.createElement('th');
    tableHeader6.innerHTML = 'Deleter';
    tableRow1.appendChild(tableHeader1);
    tableRow1.appendChild(tableHeader2);
    tableRow1.appendChild(tableHeader3);
    tableRow1.appendChild(tableHeader4);
    tableRow1.appendChild(tableHeader5);
    tableRow1.appendChild(tableHeader6);
    table.appendChild(tableRow1);

    for(bolsista of listaDeBolsistas){
        let tableRow = document.createElement('tr');
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = bolsista.id;
        let tableHeader2 = document.createElement('td');
        tableHeader2.innerHTML = bolsista.nome;
        tableHeader2.className = 'tdNome';
        let tableHeader3 = document.createElement('td');
        tableHeader3.innerHTML = bolsista.data_inicio;
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