
rolesusuariosusuarios_rolesvehiculosvehiculos_favvehiculos_favvehiculos_favCREATE DATABASE efast;  

USE efast;  
# Vehiculos
SELECT * FROM efast.vehiculos;

INSERT INTO efast.vehiculos VALUES ('1', 'https://img.freepik.com/foto-gratis/vista-coche-3d_23-2150796896.jpg?w=1380&t=st=1706220401~exp=1706221001~hmac=ec07bc9e2a56df50c6bcc4f97e0628554c1c7a978759348a70124c9bfda30b62', '5.00', '3', 'descripcion coche que inserto el 25/01/2024', 'coche aja');
INSERT INTO efast.vehiculos VALUES ('2', 'https://img.freepik.com/foto-gratis/vista-coche-3d_23-2150796896.jpg?w=1380&t=st=1706220401~exp=1706221001~hmac=ec07bc9e2a56df50c6bcc4f97e0628554c1c7a978759348a70124c9bfda30b62', '5.00', '2', 'descripcion coche que inserto el 27/01/2024', 'coche aja2');
INSERT INTO efast.vehiculos VALUES ('3', 'https://img.freepik.com/foto-gratis/vista-coche-3d_23-2150796896.jpg?w=1380&t=st=1706220401~exp=1706221001~hmac=ec07bc9e2a56df50c6bcc4f97e0628554c1c7a978759348a70124c9bfda30b62', '5.00', '1', 'descripcion coche que inserto el 27/01/2024', 'coche aja3');
INSERT INTO efast.vehiculos VALUES ('4', 'https://img.freepik.com/foto-gratis/vista-coche-3d_23-2150796896.jpg?w=1380&t=st=1706220401~exp=1706221001~hmac=ec07bc9e2a56df50c6bcc4f97e0628554c1c7a978759348a70124c9bfda30b62', '5.00', '4', 'descripcion coche que inserto el 27/01/2024', 'coche aja4');
commit;

# usuarios
INSERT INTO `efast`.`usuarios`
(`user_id`,
`last_name`,
`user_email`,
`user_name`,
`user_password`,
`user_phone`)
VALUES
(1,
"Jimenez",
"albberto@mail.com",
"Alberto",
"12345",
"600123456");
commit;
SELECT * FROM efast.usuarios;

# vehiculos_fav
INSERT INTO `efast`.`vehiculos_fav`
(`id_fav`,
`user_id`,
`vehicle_id`)
VALUES
(1,
1,
2);
commit;
SELECT * FROM efast.vehiculos_fav;

# vehicle_id, imageuri, price, quantity, vehicle_description, vehicle_name
# '1', 'https://img.freepik.com/foto-gratis/vista-coche-3d_23-2150796896.jpg?w=1380&t=st=1706220401~exp=1706221001~hmac=ec07bc9e2a56df50c6bcc4f97e0628554c1c7a978759348a70124c9bfda30b62', '5.00', '3', 'descripcion coche que inserto el 25/01/2024', 'coche aja'

# INSERTA con engine=MyISAM:   KO, no puedo ver los FK insertados en workbench. para verlos insertarlo con engine=InnoDB   . apuntes: https://onedrive.live.com/redir?resid=E6597D01B85BCB5C%2115582&page=Edit&wd=target%28Java-MicrosProfessional.one%7C44943172-3bea-4f57-a108-718cd0027440%2FHibernate%7Cd1d542ef-4500-4a0a-b2e9-32021230c028%2F%29&wdorigin=NavigationUrl   
# DROP DATABASE `efast`;

# Se crea en automatico al iniciar el micro backend-efast, si no existen las tablas. Si debe existir la BBDD efast
# CREATE TABLE peliculas ( codPelicula INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(40) NOT NULL, fechaAlta DATE NULL DEFAULT '06/01/10', stock TINYINT NULL, precio FLOAT NOT NULL );  


/*  Log de Spring con  
Hibernate: 
    
    drop table if exists reservas
Hibernate: 
    
    drop table if exists roles
Hibernate: 
    
    drop table if exists usuarios
Hibernate: 
    
    drop table if exists usuarios_roles
Hibernate: 
    
    drop table if exists vehiculos
Hibernate: 
    
    drop table if exists vehiculos_fav
Hibernate: 
    
    create table reservas (
       id bigint not null auto_increment,
        bill_add varchar(255),
        order_date datetime,
        quantity bigint,
        ship_add varchar(255),
        user_id bigint,
        vehicle_id bigint,
        primary key (id)
    ) engine=MyISAM
Hibernate: 
    
    create table roles (
       rol_id bigint not null auto_increment,
        nombre varchar(255),
        primary key (rol_id)
    ) engine=MyISAM
Hibernate: 
    
    create table usuarios (
       user_id bigint not null auto_increment,
        last_name varchar(100) not null,
        user_email varchar(255),
        user_name varchar(255),
        user_password varchar(255),
        user_phone varchar(255),
        primary key (user_id)
    ) engine=MyISAM
Hibernate: 
    
    create table usuarios_roles (
       user_id bigint not null,
        rol_id bigint not null,
        primary key (user_id, rol_id)
    ) engine=MyISAM
Hibernate: 
    
    create table vehiculos (
       vehicle_id bigint not null auto_increment,
        imageuri varchar(255),
        price decimal(38,2) not null,
        quantity bigint,
        vehicle_description varchar(255),
        vehicle_name varchar(255) not null,
        primary key (vehicle_id)
    ) engine=MyISAM
Hibernate: 
    
    create table vehiculos_fav (
       id_fav bigint not null auto_increment,
        user_id bigint,
        vehicle_id bigint,
        primary key (id_fav)
    ) engine=MyISAM
Hibernate: 
    
    alter table reservas 
       add constraint FK4lpvni6g9ct6v42mo9adg9rll 
       foreign key (user_id) 
       references usuarios (user_id)
Hibernate: 
    
    alter table reservas 
       add constraint FKmxlu4tnd35bbq1qfvpijglssx 
       foreign key (vehicle_id) 
       references vehiculos (vehicle_id)
Hibernate: 
    
    alter table usuarios_roles 
       add constraint FK5338ehgluufgc8bpj08nrq970 
       foreign key (rol_id) 
       references roles (rol_id)
Hibernate: 
    
    alter table usuarios_roles 
       add constraint FKisd054ko30hm3j6ljr90asype 
       foreign key (user_id) 
       references usuarios (user_id)
Hibernate: 
    
    alter table vehiculos_fav 
       add constraint FK10dyj3kkq8l61r2q08fvtqqga 
       foreign key (user_id) 
       references usuarios (user_id)
Hibernate: 
    
    alter table vehiculos_fav 
       add constraint FKac0uvxnelgx2nldj7572ray25 
       foreign key (vehicle_id) 
       references vehiculos (vehicle_id)                 */
  /*---------------------------------------------------------------------*/     
# INSERTA con engine=InnoDB:   OK  (comentado el dialect en .propeties de Springboot): #spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5Dialect

/* Hibernate: 
    
    alter table reservas 
       drop 
       foreign key FK4lpvni6g9ct6v42mo9adg9rll
Hibernate: 
    
    alter table reservas 
       drop 
       foreign key FKmxlu4tnd35bbq1qfvpijglssx
Hibernate: 
    
    alter table usuarios_roles 
       drop 
       foreign key FK5338ehgluufgc8bpj08nrq970
Hibernate: 
    
    alter table usuarios_roles 
       drop 
       foreign key FKisd054ko30hm3j6ljr90asype
Hibernate: 
    
    alter table vehiculos_fav 
       drop 
       foreign key FK10dyj3kkq8l61r2q08fvtqqga
Hibernate: 
    
    alter table vehiculos_fav 
       drop 
       foreign key FKac0uvxnelgx2nldj7572ray25
Hibernate: 
    
    drop table if exists reservas
Hibernate: 
    
    drop table if exists roles
Hibernate: 
    
    drop table if exists usuarios
Hibernate: 
    
    drop table if exists usuarios_roles
Hibernate: 
    
    drop table if exists vehiculos
Hibernate: 
    
    drop table if exists vehiculos_fav
Hibernate: 
    
    create table reservas (
       id bigint not null auto_increment,
        bill_add varchar(255),
        order_date datetime,
        quantity bigint,
        ship_add varchar(255),
        user_id bigint,
        vehicle_id bigint,
        primary key (id)
    ) engine=InnoDB
Hibernate: 
    
    create table roles (
       rol_id bigint not null auto_increment,
        nombre varchar(255),
        primary key (rol_id)
    ) engine=InnoDB
Hibernate: 
    
    create table usuarios (
       user_id bigint not null auto_increment,
        last_name varchar(100) not null,
        user_email varchar(255),
        user_name varchar(255),
        user_password varchar(255),
        user_phone varchar(255),
        primary key (user_id)
    ) engine=InnoDB
Hibernate: 
    
    create table usuarios_roles (
       user_id bigint not null,
        rol_id bigint not null,
        primary key (user_id, rol_id)
    ) engine=InnoDB
Hibernate: 
    
    create table vehiculos (
       vehicle_id bigint not null auto_increment,
        imageuri varchar(255),
        price decimal(38,2) not null,
        quantity bigint,
        vehicle_description varchar(255),
        vehicle_name varchar(255) not null,
        primary key (vehicle_id)
    ) engine=InnoDB
Hibernate: 
    
    create table vehiculos_fav (
       id_fav bigint not null auto_increment,
        user_id bigint,
        vehicle_id bigint,
        primary key (id_fav)
    ) engine=InnoDB
Hibernate: 
    
    alter table reservas 
       add constraint FK4lpvni6g9ct6v42mo9adg9rll 
       foreign key (user_id) 
       references usuarios (user_id)
Hibernate: 
    
    alter table reservas 
       add constraint FKmxlu4tnd35bbq1qfvpijglssx 
       foreign key (vehicle_id) 
       references vehiculos (vehicle_id)
Hibernate: 
    
    alter table usuarios_roles 
       add constraint FK5338ehgluufgc8bpj08nrq970 
       foreign key (rol_id) 
       references roles (rol_id)
Hibernate: 
    
    alter table usuarios_roles 
       add constraint FKisd054ko30hm3j6ljr90asype 
       foreign key (user_id) 
       references usuarios (user_id)
Hibernate: 
    
    alter table vehiculos_fav 
       add constraint FK10dyj3kkq8l61r2q08fvtqqga 
       foreign key (user_id) 
       references usuarios (user_id)
Hibernate: 
    
    alter table vehiculos_fav 
       add constraint FKac0uvxnelgx2nldj7572ray25 
       foreign key (vehicle_id) 
       references vehiculos (vehicle_id)   */


      
      