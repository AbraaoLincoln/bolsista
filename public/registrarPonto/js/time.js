function updateHour(){
    let date = new Date();
    // date.getFullYear()
    // date.getMonth()
    // date.getDay()
    document.getElementById('hora').innerText = date.getHours();
    document.getElementById('minutos').innerText = date.getMinutes();
    document.getElementById('segundos').innerText = date.getSeconds();
}

function startTimer(){
    setInterval(updateHour, 1000);
}

window.onload = startTimer;