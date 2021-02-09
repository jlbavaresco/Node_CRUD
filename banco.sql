create table estados (
codigo serial not null primary key, 
nome varchar(50) not null, 
uf varchar(2) not null);

create table cidades (
codigo serial not null primary key, 
nome varchar(50) not null, 
estado integer not null, 
foreign key (estado) references estados (codigo));

insert into estados (nome, uf) values ('Rio Grande do Sul', 'RS'), 
('Santa Catarina', 'SC'), ('São Paulo', 'SP');

insert into cidades (nome, estado) values 
('Passo Fundo', 1) , ('Lagoa Vermelha', 1) , 
('Florianópilis', 2) , ('Campos Novos', 2) ,
('São Paulo', 3) , ('Santos', 3);




