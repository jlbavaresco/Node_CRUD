create table estados (
codigo serial not null primary key, 
nome varchar(50) not null, 
uf varchar(2) not null);

create table cidades (
codigo serial not null primary key, 
nome varchar(50) not null, 
estado integer not null, 
foreign key (estado) references estados (codigo));

create table pessoas (
codigo serial not null, 
nome varchar(50) not null, 
nascimento date not null, 
salario numeric(10,2) not null, 
cidade integer not null, 
primary key (codigo), 
foreign key (cidade) references cidades (codigo)
);

insert into estados (nome, uf) values ('Rio Grande do Sul', 'RS'), 
('Santa Catarina', 'SC'), ('São Paulo', 'SP');

insert into cidades (nome, estado) values 
('Passo Fundo', 1) , ('Lagoa Vermelha', 1) , 
('Florianópilis', 2) , ('Campos Novos', 2) ,
('São Paulo', 3) , ('Santos', 3);


insert into pessoas (nome, nascimento, salario, cidade) values 
('Jorge Bavaresco', '1979-10-25', 5000.00, 1);



