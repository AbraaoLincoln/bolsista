var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require("dotenv").config();

let app = express();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Routers
app.get('/', (req, res) => {
    res.write('Hello World!');
    res.end();
})
//Inicialização do Servidor
app.listen(3000, () => {console.log("Servidor executando...")});