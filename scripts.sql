CREATE TABLE client (
  id serial primary key not null,
  name varchar(100),
  rg varchar (30) unique,
  cpf varchar (20) unique,
  email varchar(200) unique,
  telephone varchar(30),
  celphone varchar(30) unique,
  cep varchar(100),
  address varchar (255),
  number int,
  complement varchar (200),
  neighborhood varchar (100),
  city varchar (100),
  state varchar (2)
);

create table employee(
	id serial primary key not null,
	name varchar(100),
	rg varchar(30) unique,
	cpf varchar(20) unique,
	email varchar(200) unique,
	password varchar(200),
	office varchar(100),
	access_level varchar(50),
	telephone varchar(30),
	celphone varchar(30) unique,
	cep varchar(100),
	address varchar(255),
	number int,
	complement varchar(200),
	neighborhood varchar(100),
	city varchar(100),
	state varchar(2)

);

create table provider (

	id serial primary key not null,
	name varchar(100),
	cnpj varchar(100) unique,
	email varchar(200) unique,
	telephone varchar(30),
	celphone varchar(30) unique,
	cep varchar(100),
	address varchar(255),
	number integer,
	complement varchar(200),
	neighborhood varchar(100),
	city varchar(100),
	state varchar(2)
);

create table product(
	
	id serial primary key not null,
	description varchar(100),
	price double precision,
	quantity_stock integer,
	for_id integer not null,


FOREIGN KEY (for_id) REFERENCES provider(id) on delete cascade on update cascade 

);

CREATE TABLE sales (
  id serial not null primary key,
  client_id integer,
  date_sales timestamp,
  total_venda double precision,
  comments text,

  FOREIGN KEY (client_id) REFERENCES client(id)
);


CREATE TABLE items_sales (
  id serial not null primary key,
  sale_id integer,
  product_id integer,
  qtd integer,
  subtotal double precision,

  FOREIGN KEY (sale_id) REFERENCES sales(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);


