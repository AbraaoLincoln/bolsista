function promisify(dbConnection, sql){
    return new Promise((resolve, reject) => {
        dbConnection.connect(err => {
            if(err) reject(err);
            dbConnection.query(sql, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        })
    })
}

module.exports = promisify;