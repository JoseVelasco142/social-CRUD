/**
 * Created by root on 13/02/16.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('colegio.db');
function createDb () {
    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS alumnos (idAlumno INTEGER PRIMARY KEY AUTOINCREMENT, nombre varchar(20), apellidos varchar(50), email varchar(50), asignaturas varchar(200))");
        db.run("CREATE TABLE IF NOT EXISTS asignaturas (idAsignatura INTEGER PRIMARY KEY AUTOINCREMENT, nombre varchar(20), descripcion varchar(50),  profesor VARCHAR(20))");
        db.run("CREATE TABLE IF NOT EXISTS profesores (idProfesor INTEGER PRIMARY KEY AUTOINCREMENT, nombre varchar(20), apellidos varchar(50), email varchar(50), asignatura varchar(20))");
    });
}
function addData (){
    db.serialize(function () {
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('Jose', 'Velasco', 'jose@jose.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('Diego', 'Pastor', 'diego@diego.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('Laura', 'Carmona', 'laura@laura.com', 'servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('Oscar', 'Serrano', 'oscar@oscar.com', 'servicios, base de datos, aplicaciones, seguridad')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('Juanma', 'Palma', 'juanma@juanma.com', 'servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('Alvaro', 'Costela', 'alvaro@alvaro.com', 'servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('Eduardo', 'Mallea', 'eduardo@eduardo.com', 'base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('Alejandro', 'Carmona', 'alejandro@alejandro.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('marta', 'Gonzalez', 'marta@marta.com', 'sistemas, base de datos')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('Jose', 'Gonzalez', 'jose@jose.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('test1', 'test1', 'test1@test1.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('test2', 'test2', 'test2@test2.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('test3', 'test3', 'test3@test3.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('test4', 'test4', 'test4@test4.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('test5', 'test5', 'test5@test5.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas) VALUES ('test6', 'test6', 'test6@test6.com', 'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");



        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('Susana','Lopez','Susana@Susana.com','servicios')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('Raul','Jimenez','Raul@Raul.com','sistemas')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('Luisa','Oliver','Luisa@Luisa.com','empresa')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('Cristina','Rodriguez','Cristina@Cristina.com','base de datos')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('Celia','Benito','Celia@Celia.com','aplicaciones web')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('Almudena','....','Almudena@Almudena.com','seguridad')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('test1','test1','test1@test1.com','seguridad')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('test2','test2','test2@test2.com','seguridad')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('test3','test3','test3@test3.com','seguridad')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('test4','test4','test4@test4.com','seguridad')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('test5','test5','test5@test5.com','seguridad')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('test6','test6','test6@test6.com','seguridad')");

        db.run("INSERT INTO asignaturas(nombre, descripcion, profesor) VALUES('Servicios','descripcion servicios','Susana')");
        db.run("INSERT INTO asignaturas(nombre, descripcion, profesor) VALUES('Sistemas','descripcion sistemas','Raul')");
        db.run("INSERT INTO asignaturas(nombre, descripcion, profesor) VALUES('Empresas','descripcion Empresas','Luisa')");
        db.run("INSERT INTO asignaturas(nombre, descripcion, profesor) VALUES('base de datos','descripcion base de datos','Cristina')");
        db.run("INSERT INTO asignaturas(nombre, descripcion, profesor) VALUES('aplicaciones web','descripcion aplicaciones web ','Celia')");
        db.run("INSERT INTO asignaturas(nombre, descripcion, profesor) VALUES('seguridad','descripcion seguridad','Almudena')");
    });
}
/*
createDb();
addData();
*/
