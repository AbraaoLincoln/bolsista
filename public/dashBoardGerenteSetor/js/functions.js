var auxAtr = [];

function add(){
    if(currentPage == 1){

    }else if(currentPage == 2){
        registrarPontoCompletoNoBD();
    }
}

function update(){
    switch(currentPage){
        case 1:
            break;
        case 2:
            atualizarPontoNoBD({
                cpf: auxAtr[0],
                data: formatDateMysql(auxAtr[1]),
                listaDeAtributos: makeListOfAtributes('updateFormPonto')
            });
            auxAtr = [];
            break;
    }
}

function makeListOfAtributes(form){
    let atrs = document.getElementById('tBolsista').children[0].children;
    let inputs = [];
    let listaDeAtributos = [];
    for(i of document.getElementById(form).children){
        if(i.nodeName == 'INPUT'){
            inputs.push(i);
        }
    }
    for(let i = 0; i < (atrs.length - 1); i++){
        let obj = {};
        obj.atr = atrs[i].innerText;
        if(inputs[i].name == 'hora'){
            obj.val = inputs[i].value.replace(':', '');
        }else if(inputs[i].name == 'data'){
            obj.val = "'" + formatDateMysql(inputs[i].value) + "'";
        }else{
            obj.val = inputs[i].value;
        }
        listaDeAtributos.push(obj);
    }
    console.log(listaDeAtributos);
    return listaDeAtributos
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

