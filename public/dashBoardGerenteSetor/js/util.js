function formatDateMysql(dataToFormat){
    let splitDate = dataToFormat.split('/');
    return splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
}

function formatHour(hourInt){
    if(hourInt){
        let str = hourInt.toString();
        if(str.length == 3){
            return str[0] + ':' + str[1] + str[2];
        }else{
            return str[0] + str[1] + ':' + str[2] + str[3];
        }
    }
}