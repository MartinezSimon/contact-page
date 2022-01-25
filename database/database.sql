create database if not exists contactdb;

use contactdb;

drop table if exists customer;

create table customer
(
    id          serial,
    email       varchar(150)       not null,
    firstName   varchar(20)        not null,
    lastName    varchar(20)        not null,
    username    varchar(30)        not null,
    password    varchar(255)       not null,
    phoneNumber varchar(13)        not null,
    ahvNumber   varchar(16) unique not null,
    registered  datetime           not null default current_timestamp
);