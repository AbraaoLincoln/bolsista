use SigBolsista;

create table unidade (
	id int auto_increment,
    nome varchar(45),
    primary key(id)
);

create table gerenteUnidade(
	cpf char(11),
    nome varchar(45),
    senha varchar(255),
    unidadeGerencia int,
    primary key(cpf),
    foreign key(unidadeGerencia)
		references unidade(id)
        on update cascade
        on delete cascade
    
);

create table setor(
	id int auto_increment,
    nome varchar(45),
    unidade int,
    primary key(id),
    foreign key(unidade)
		references unidade(id)
        on update cascade
        on delete cascade
);

create table gerenteSetor(
	cpf char(11),
    nome varchar(45),
    senha varchar(255),
    setorGerencia int,
    primary key(cpf),
    foreign key(setorGerencia)
		references setor(id)
        on update cascade
        on delete cascade
    
);

create table maquina(
	ip int,
    setor int,
    primary key(ip),
    foreign key(setor)
		references setor(id)
        on update cascade
        on delete cascade
);

create table bolsista(
	cpf char(11),
    nome varchar(45),
    senha varchar(255),
    data_inicio date,
    carga_horaria int,
    setor int,
    primary key(cpf),
    foreign key(setor)
		references setor(id)
        on update cascade
        on delete cascade
);

create table registro_ponto(
    dia date,
    hora_entrada int,
    hora_saida int,
    bolsista char(11),
    primary key(dia, bolsista),
    foreign key(bolsista)
		references bolsista(cpf)
        on update cascade
        on delete cascade
);


DELIMITER $$
DROP TRIGGER IF EXISTS check_hora $$
create trigger check_hora before insert 
on registro_ponto
for each row
begin
if  new.hora_entrada > new.hora_saida then
set new.hora_saida = 0;
end if;
end $$

DELIMITER $$
DROP TRIGGER IF EXISTS check_hora_update $$
create trigger check_hora_update before update 
on registro_ponto
for each row
begin
if  old.hora_entrada > new.hora_saida then
set new.hora_saida = old.hora_saida;
end if;
end $$

DROP TRIGGER IF EXISTS check_horaEntrada_update $$
create trigger check_horaEntrada_update before update 
on registro_ponto
for each row
begin
if  new.hora_entrada > old.hora_saida then
set new.hora_entrada = old.hora_entrada;
end if;
end $$

DELIMITER ;

create table justificativa(
	id int auto_increment,
    descricao varchar(255),
    bolsista char(11),
    primary key(id),
    foreign key(bolsista)
		references bolsista(cpf)
        on update cascade
        on delete cascade
);

create table dia_justificativa(
	dia date,
    justificativa_id int,
    primary key(dia, justificativa_id),
    foreign key(justificativa_id)
		references justificativa(id)
);



create table administrador(
	cpf char(11),
    nome varchar(45),
    senha varchar(255),
    primary key(cpf)
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
 
 insert into justificativa values(1, "Consulta Medica", 79220104865), (2, "sem vontade de ir", 12345678912);
 
 insert into dia_justificativa values('2020-12-15', 1),('2020-12-16', 2),('2020-12-17', 2);

create database mydb;
use mydb;

create table UNIDADE (
	Id int auto_increment,
    Nome varchar(45),
    primary key(id)
);

create table GERENTE_UNIDADE(
	Id char(11),
    Nome varchar(45),
    Senha varchar(255),
    FK_IdUnidade int,
    primary key(Id),
    foreign key(FK_IdUnidade)
		references UNIDADE(Id)
        on update cascade
        on delete cascade
    
);

create table SETOR(
	Id int auto_increment,
    Nome varchar(45),
    FK_IdUnidade int,
    primary key(Id),
    foreign key(FK_IdUnidade)
		references UNIDADE(Id)
        on update cascade
        on delete cascade
);

create table GERENTE_SETOR(
	Id char(11),
    Nome varchar(45),
    Senha varchar(255),
    FK_IdSetor int,
    primary key(Id),
    foreign key(FK_IdSetor)
		references SETOR(Id)
        on update cascade
        on delete cascade
    
);

create table MAQUINA(
	Ip int,
    FK_IdSetor int,
    primary key(Ip),
    foreign key(FK_IdSetor)
		references SETOR(Id)
        on update cascade
        on delete cascade
);

create table BOLSISTA(
	Id char(11),
    Nome varchar(45),
    Senha varchar(255),
    Data_inicio date,
    CargaHoraria int,
    FK_IdSetor int,
    primary key(Id),
    foreign key(FK_IdSetor)
		references SETOR(Id)
        on update cascade
        on delete cascade
);

create table REGISTRO_PONTO(
    Dia date,
    Hora_entrada int,
    Hora_saida int,
    FK_IdBolsista char(11),
    primary key(Dia, FK_IdBolsista),
    foreign key(FK_IdBolsista)
		references BOLSISTA(Id)
        on update cascade
        on delete cascade
);


DELIMITER $$
DROP TRIGGER IF EXISTS check_hora $$
create trigger check_hora before insert 
on REGISTRO_PONTO
for each row
begin
if  new.Hora_entrada > new.Hora_saida then
set new.Hora_saida = 0;
end if;
end $$

DELIMITER $$
DROP TRIGGER IF EXISTS check_hora_update $$
create trigger check_hora_update before update 
on REGISTRO_PONTO
for each row
begin
if  old.Hora_entrada > new.Hora_saida then
set new.Hora_saida = old.Hora_saida;
end if;
end $$

DROP TRIGGER IF EXISTS check_horaEntrada_update $$
create trigger check_horaEntrada_update before update 
on REGISTRO_PONTO
for each row
begin
if  new.Hora_entrada > old.Hora_saida then
set new.Hora_entrada = old.Hora_entrada;
end if;
end $$

DELIMITER ;

create table JUSTIFICATIVA(
	Id int auto_increment,
    Descricao varchar(255),
    FK_IdBolsista char(11),
    primary key(Id),
    foreign key(FK_IdBolsista)
		references BOLSISTA(Id)
        on update cascade
        on delete cascade
);

create table DIA_PONTO(
	Dia date,
    FK_IdJustificativa int,
    primary key(Dia, FK_IdJustificativa),
    foreign key(FK_IdJustificativa)
		references JUSTIFICATIVA(Id)
        on update cascade
        on delete cascade
);

create table ADMINISTRADOR(
	Id char(11),
    Nome varchar(45),
    Senha varchar(255),
    primary key(cpf)
);

create view justificativa_e_dia as
select Id, Descricao, FK_IdBolsista, Dia
from JUSTIFICATIVA, DIA_PONTO
where Id = FK_IdJustificativa;
