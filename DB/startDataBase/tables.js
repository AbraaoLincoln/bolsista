exports.unidade = "create table unidade ( id int, nome varchar(45), primary key(id) )";

exports.gerenteUnidade = "create table gerenteUnidade( id char(11), nome varchar(45), senha varchar(255), unidadeGerencia int, primary key(id), foreign key(unidadeGerencia) references unidade(id) on update cascade on delete cascade)"

exports.setor = "create table setor( id int, nome varchar(45), unidade int, primary key(id), foreign key(unidade) references unidade(id) on update cascade on delete cascade)"

exports.gerenteSetor = "create table gerenteSetor( id char(11), nome varchar(45), senha varchar(255), setorGerencia int, primary key(id), foreign key(setorGerencia) references setor(id) on update cascade on delete cascade )"

exports.maquina = "create table maquina( id int, setor int, primary key(id), foreign key(setor) references setor(id) on update cascade on delete cascade )"

exports.bolsista = "create table bolsista( cpf char(11), nome varchar(45), senha varchar(255), data_inicio date, carga_horaria int, setor int, primary key(id), foreign key(setor) references setor(id) on update cascade on delete cascade )"

exports.registro_ponto = "create table registro_ponto( dia date, hora_entrada int, hora_saida int, bolsista char(11), primary key(dia, bolsista), foreign key(bolsista) references bolsista(id) on update cascade on delete cascade )"

exports.justificativa = "create table justificativa( id int, descricao varchar(255), bolsista char(11), primary key(id), foreign key(bolsista) references bolsista(id) on update cascade on delete cascade )"

exports.dia_justificativa = "create table dia_justificativa( dia date, justificativa int, primary key(dia, justificativa), foreign key(justificativa) references justificativa(id) )"

exports.administrador = "create table administrador( id char(11), nome varchar(45), senha varchar(255), primary key(id) )"