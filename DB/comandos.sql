use SigBolsista;

create table unidade (
	id int,
    nome varchar(45),
    primary key(id)
);

create table gerenteUnidade(
	id bigint,
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
	id bigint,
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
	id bigint,
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
    bolsista bigint,
    primary key(id, bolsista),
    foreign key(bolsista)
		references bolsista(id)
        on update cascade
        on delete cascade
);

create table justificativa(
	id int,
    descricao varchar(255),
    bolsista bigint,
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
	id bigint,
    nome varchar(45),
    senha varchar(255),
    primary key(id)
);

insert into unidade values(1, 'IMD'), (2, 'CCET'), (3, 'CB');

insert into gerenteUnidade values(38945131957, 'Rita Isabelle Rocha', 'senha123', 1),
 (35708942150, 'Mariah Elaine Aparecida Souza', '123senha', 2), 
 (22073911404, 'Enrico Eduardo Kevin Monteiro', '123senhA321', 3);
 
 insert into setor values(1, 'TI', 1), (2, 'Inovacao', 1), (3, 'Desenvolvimento', 1);
 
 insert into gerenteSetor values(26180320985, 'Lucca Geraldo Benedito Assis', 'pasSenha112233', 1), 
(63154822526, 'Victor Bernardo Iago Lima', 'pass112233word', 2),
(30938019406, 'Gabrielly Tânia Bárbara Moreira', '112233', 3);
 
 insert into bolsista values(79220104865, 'Isadora Betina Figueiredo', 'senha123', '2020-11-17', 0, 1),
(42373216302, 'Yasmin Cláudia Lima', '123', '2020-02-15', 0, 1),
(70087906350, 'Isabelle Allana Nunes', '123senha', '2020-10-22', 0, 2),
(36345620726, 'Osvaldo Vicente Oliver da Silva', '123senha', '2020-01-25', 0, 2),
(49699583274, 'Marcelo Felipe Peixoto', '123senha', '2020-02-13', 0, 3),
(20880686359, 'Carlos Eduardo Marcos Vinicius Nogueira', '123senha4', '2020-08-20', 0, 3),
(84801934846, 'Edson Enzo Breno Castro', 'senha123', '2020-01-10', 0, 1),
 (28075351517, 'Murilo Jorge Aparício', 'senha1234', '2020-03-02', 0, 2),
 (04463689201, 'Sarah Brenda Heloisa Gomes', 'senha', '2020-03-07', 0, 3);
 
 insert into bolsista values(12345678912, 'Fulano Cicrano da Silva', '123', '2020-12-11', 100, 1);
