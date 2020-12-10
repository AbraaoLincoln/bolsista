var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require("dotenv").config();
const registrarPontoRouter = require('./routes/registrarPonto/registrarPonto');
const gerenciarSetorRouter = require('./routes/gerenciarSetor/gerenciarSetor');
let app = express();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Routers
app.use('/registrarPonto', registrarPontoRouter);
app.use('/gerenciarSetor', gerenciarSetorRouter);


//Inicialização do Servidor
app.listen(3000, () => {console.log("Servidor executando...")});