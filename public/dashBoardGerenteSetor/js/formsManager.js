function showTable(){
    document.getElementById('backMenu').style.display ='none';
    document.getElementById('tBack').style.display ='flex';
}

function hideForm(){
    document.getElementById('bForms').style.display = 'none';
}

function hideForms(){
    document.getElementById('addForm').style.display = 'none';
    document.getElementById('updateForm').style.display = 'none';
    document.getElementById('addFormPonto').style.display = 'none';
    document.getElementById('updateFormPonto').style.display = 'none';
    document.getElementById('addFormGerenteSetor').style.display = 'none';
    document.getElementById('updateFormGerenteSetor').style.display = 'none';
    document.getElementById('addFormGerenteUnidade').style.display = 'none';
    document.getElementById('updateFormGerenteUnidade').style.display = 'none';
}

function showAddForm(){
    document.getElementById('bForms').style.display = 'flex';
    hideForms();
    if(currentPage == 1){
        document.getElementById('addForm').style.display = 'flex';
    }else if(currentPage == 2){
        document.getElementById('addFormPonto').style.display = 'flex';
    }else if(currentPage == 5){
        document.getElementById('addFormGerenteSetor').style.display = 'flex';
    }else if(currentPage == 6){
        document.getElementById('addFormGerenteUnidade').style.display = 'flex';
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
    document.getElementById('bForms').style.display = 'flex';
    hideForms();
    document.getElementById('updateFormPonto').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateCpfBolPonto').value = dadosBolsista[0].innerText;
    document.getElementById('updateNomebolPonto').value = dadosBolsista[1].innerText;
    document.getElementById('updateHoraIncBolPonto').value = dadosBolsista[2].innerText;
    document.getElementById('updateHoraSaidaBolPonto').value = dadosBolsista[3].innerText;

    auxAtr.push(document.getElementById('updateCpfBolPonto').value);
    auxAtr.push(document.getElementById('updateNomebolPonto').value);
}

function showEditGerenteSetor(event){
    document.getElementById('bForms').style.display = 'flex';
    hideForms();
    document.getElementById('updateFormGerenteSetor').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateCpfGerenteSetor').value = dadosBolsista[0].innerText;
    document.getElementById('updateNomeGerenteSetor').value = dadosBolsista[1].innerText;
    document.getElementById('updateSetorGerencia').value = dadosBolsista[2].innerText;
}

function showEditGerenteUnidade(event){
    document.getElementById('bForms').style.display = 'flex';
    hideForms();
    document.getElementById('updateFormGerenteUnidade').style.display = 'flex';

    let dadosBolsista = event.target.parentNode.children;

    document.getElementById('updateCpfGerenteUnidade').value = dadosBolsista[0].innerText;
    document.getElementById('updateNomeGerenteUnidade').value = dadosBolsista[1].innerText;
    document.getElementById('updateUnidadeGerencia').value = dadosBolsista[2].innerText;
}