var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require("dotenv").config();
const adminRouter = require('./routes/admin/admin');
const registrarPontoRouter = require('./routes/registrarPonto/registrarPonto');
const gerenciarSetorRouter = require('./routes/gerenciarSetor/gerenciarSetor');
const gerenciarUnidade = require('./routes/gerenteUnidade/gerenciarUnidade')
const bolsistaRouter = require('./routes/bolsista/bolsista');
const justRouter = require('./routes/justificativa/justificativa');
const maquinaRouter = require('./routes/maquina/maquina');
let app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Routers
app.use('/admin', adminRouter);
app.use('/ponto', registrarPontoRouter);
app.use('/gerenciarSetor', gerenciarSetorRouter);
app.use('/gerenciarUnidade', gerenciarUnidade);
app.use('/bolsista', bolsistaRouter);
app.use('/justificativa', justRouter);
app.use('/maquina', maquinaRouter);


//Inicialização do Servidor
app.listen(3000, () => {console.log("Servidor executando...")});