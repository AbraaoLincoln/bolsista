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
        tableHeader1.innerHTML = bolsista.cpf;
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

function createTableGerentes(listaDeGerentes,  typeOfGerente){
    // tableRows = [];
    let atributes = ['CPF', 'Nome', 'Setor Gerencia', 'Unidade Gerencia'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(let i = 0; i < atributes.length; i++){
        if(i == 2 && typeOfGerente){
            continue;
        }
        if(i == 3 && !typeOfGerente){
            continue;
        }
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atributes[i];
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);
    table.appendChild(tableRow1);

    for(gerente of listaDeGerentes){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', !typeOfGerente ? showEditGerenteSetor : showEditGerenteUnidade);
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = gerente.cpf;
        let tableHeader2 = document.createElement('td');
        tableHeader2.innerHTML = gerente.nome;
        tableHeader2.className = 'tdNome';
        let tableHeader3 = document.createElement('td');
        tableHeader3.innerHTML = !typeOfGerente ? gerente.setorGerencia : gerente.unidadeGerencia;
        let tableHeader4 = document.createElement('input');
        tableHeader4.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableRow.appendChild(tableHeader3);
        tableRow.appendChild(tableHeader4);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}

function createTableSetores(lista,  typeOf){
    // tableRows = [];
    let atributes = ['Id', 'Nome', 'Unidade'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(let i = 0; i < atributes.length; i++){
        if(i == 2 && typeOf){
            continue;
        }
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atributes[i];
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);
    table.appendChild(tableRow1);

    for(aux of lista){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', typeOf ? showEditUnidade : showEditSetor);
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = aux.id;
        let tableHeader2 = document.createElement('td');
        tableHeader2.className = 'tdNome';
        tableHeader2.innerHTML = aux.nome;
        let tableHeader3 = document.createElement('td');
        tableHeader3.innerHTML = aux.unidade;
        let tableHeader4 = document.createElement('input');
        tableHeader4.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        if(!typeOf) tableRow.appendChild(tableHeader3);
        tableRow.appendChild(tableHeader4);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}

function createTableRegistroPonto(listaDeRegistro){
    // tableRows = [];
    let atributes = ['Bolsista', 'Dia', 'Hora Entrada', 'Hora Saida'];
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

function createTableMaquina(listaDeMaquinas){
    // tableRows = [];
    let atributes = ['IP', 'Setor'];
    let table = document.getElementById('tBolsista');
    table.innerHTML = '';

    let tableRow1 = document.createElement('tr');
    for(let i = 0; i < atributes.length; i++){
        let tableHeader1 = document.createElement('th');
        tableHeader1.innerHTML = atributes[i];
        tableRow1.appendChild(tableHeader1);
    }
    let tableHeader2 = document.createElement('th');
    tableHeader2.innerHTML = 'Deletar';
    tableRow1.appendChild(tableHeader2);
    table.appendChild(tableRow1);

    for(maquina of listaDeMaquinas){
        let tableRow = document.createElement('tr');
        tableRow.addEventListener('dblclick', showEditMaquina);
        let tableHeader1 = document.createElement('td');
        tableHeader1.innerHTML = maquina.ip;
        let tableHeader2 = document.createElement('td');
        tableHeader2.innerHTML = maquina.setor;
        let tableHeader3 = document.createElement('input');
        tableHeader3.type = 'checkbox';
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableRow.appendChild(tableHeader3);
        table.appendChild(tableRow);
        // tableRows.push(tableRow);
    }
}