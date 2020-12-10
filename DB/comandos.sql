use SigBolsista;

create table unidade (
	id int,
    nome varchar(45),
    primary key(id)
);

create table gerenteUnidade(
	id int,
    nome varchar(45),
    senha varchar(255),
    unidadeGerencia int,
    primary key(id),
    foreign key(unidadeGerencia)
		references unidade(id)
        on update cascade
        on delete cascade
    
);

create table setor(
	id int,
    nome varchar(45),
    unidade int,
    primary key(id),
    foreign key(unidade)
		references unidade(id)
        on update cascade
        on delete cascade
);

create table gerenteSetor(
	id int,
    nome varchar(45),
    senha varchar(255),
    setorGerencia int,
    primary key(id),
    foreign key(setorGerencia)
		references setor(id)
        on update cascade
        on delete cascade
    
);

create table maquina(
	id int,
    setor int,
    primary key(id),
    foreign key(setor)
		references setor(id)
        on update cascade
        on delete cascade
);

create table bolsista(
	id int,
    nome varchar(45),
    senha varchar(255),
    data_inicio date,
    carga_horaria int,
    setor int,
    primary key(id),
    foreign key(setor)
		references setor(id)
        on update cascade
        on delete cascade
);

create table registro_ponto(
	id int,
    dia date,
    hora_entrada time,
    hora_saida time,
    bolsista int,
    primary key(id, bolsista),
    foreign key(bolsista)
		references bolsista(id)
        on update cascade
        on delete cascade
);

create table justificativa(
	id int,
    descricao varchar(255),
    bolsista int,
    primary key(id),
    foreign key(bolsista)
		references bolsista(id)
        on update cascade
        on delete cascade
);

create table dia_justificativa(
	dia date,
    justificativa int,
    primary key(dia, justificativa),
    foreign key(justificativa)
		references justificativa(id)
);

create table administrador(
	id int,
    nome varchar(45),
    senha varchar(255),
    primary key(id)
);