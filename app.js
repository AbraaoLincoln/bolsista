var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require("dotenv").config();
const registrarPontoRouter = require('./routes/registrarPonto/registrarPonto');
const gerenciarSetorRouter = require('./routes/gerenciarSetor/gerenciarSetor');
const bolsistaRouter = require('./routes/bolsista/bolsista');
let app = express();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Routers
app.use('/ponto', registrarPontoRouter);
app.use('/gerenciarSetor', gerenciarSetorRouter);
app.use('/bolsista', bolsistaRouter);


//Inicialização do Servidor
app.listen(3000, () => {console.log("Servidor executando...")});