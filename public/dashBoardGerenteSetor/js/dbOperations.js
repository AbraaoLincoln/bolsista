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

async function atualizarPontoNoBD(pontoToUpdate){
    pontoToUpdate.novaCargaH = 1;
    try {
        let rawData = await fetch('http://localhost:3000/ponto', {
           method: "PUT",
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           },
           body: JSON.stringify(pontoToUpdate) 
        });
        let res = await rawData.json();
        if(res.status == 'ok'){
            alert('Ponto Atualizado com sucesso!');
        }else{
            alert('Erro ao atualizar o ponto tente novamente mais tarde!');
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