/**
 * Created by root on 1/02/16.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('colegio.db');

var _SQLITE = {
    prototype: {
        selectAll: function (table, callback) {
            var query = "SELECT * FROM " + table;
            db.all(query, function (err, rows) {
                return callback(rows);
            });
        },
        selectOne: function (table, id, callback) {
            var query = "SELECT * FROM " + table + " WHERE ";
            switch (table) {
                case "alumnos":
                    query += "idAlumno = " + id;
                    break;
                case "profesores":
                    query += "idProfesor = " + id;
                    break;
                case "asignaturas":
                    query += "idAsignatura = " + id;
                    break;
            }
            db.all(query, function (err, rows) {
                return callback(rows);
            });
        },
        insertNew: function (table, data, callback) {
            var query = "SELECT ";
            switch (table) {
                case "alumnos":
                    query += " idAlumno FROM " + table + " WHERE email = '" + data['email'] + "'";
                    break;
                case "profesores":
                    query += " idProfesor FROM " + table + " WHERE email = '" + data['email'] + "'";
                    break;
                case "asignaturas":
                    query += " idAsignatura FROM " + table + " WHERE nombre = '" + data['nombre'] + "'";
                    break;
            }
            db.all(query, function (err, rows) {
                // NO EXISTE
                if (rows.length == 0) {
                    query = "INSERT INTO " + table;
                    switch (data['v']) {
                        case "alumnos":
                            query += "(nombre, apellidos ,email, asignaturas)";
                            query += "VALUES " +
                                "('" + data['nombre'] + "'," +
                                " '" + data['apellidos'] + "'," +
                                " '" + data['email'] + "'," +
                                " '" + data['asignaturas'] + "')";
                            break;
                        case "profesores":
                            query += "(nombre, apellidos ,email, asignatura)";
                            query += "VALUES " +
                                "('" + data['nombre'] + "'," +
                                " '" + data['apellidos'] + "'," +
                                " '" + data['email'] + "'," +
                                " '" + data['asignatura'] + "')";
                            break;
                        case "asignaturas":
                            query += "(nombre, descripcion, profesor)";
                            query += "VALUES " +
                                "('" + data['nombre'] + "'," +
                                " '" + data['descripcion'] + "'," +
                                " '" + data['profesor'] + "')";

                            break;
                    }
                    db.all(query, function (err, rows) {
                        query = "SELECT ";
                        switch (table) {
                            case "alumnos":
                                query += " idAlumno FROM " + table + " WHERE email = '" + data['email'] + "'";
                                break;
                            case "profesores":
                                query += " idProfesor FROM " + table + " WHERE email = '" + data['email'] + "'";
                                break;
                            case "asignaturas":
                                query += " idAsignatura FROM " + table + " WHERE nombre = '" + data['nombre'] + "'";
                                break;
                        }
                        db.all(query, function (err, rows) {
                            return callback(rows[0]);
                        });
                    });
                } else {
                    return callback(null);
                }
            });
        },
        updateOne: function (data, callback) {
            var query = "UPDATE " + data['v'] + " SET ";
            switch (data['v']) {
                case "alumnos":
                    query += "nombre = '" + data['nombre'] +
                        "', apellidos = '" + data['apellidos'] +
                        "', email = '" + data['email'] +
                        "', asignaturas = '" + data['asignaturas'] +
                        "' WHERE idAlumno = '" + data['k'] + "'";
                    break;
                case "profesores":
                    query += "nombre = '" + data['nombre'] +
                        "', apellidos = '" + data['apellidos'] +
                        "', email = '" + data['email'] +
                        "', asignaturas = '" + data['asignaturas'] +
                        "' WHERE idProfesor = '" + data['k'] + "'";
                    break;
                case "asignaturas":
                    query += "nombre = '" + data['nombre'] +
                        "', descripcion = '" + data['descripcion'] +
                        "', profesor = '" + data['profesor'] +
                        "' WHERE idAsignatura = '" + data['k'] + "'";
                    break;
            }
            db.all(query, function (err, rows) {
                if (err == null)
                    return callback(true);
            });

        },
        deleteOne: function (table, id) {
            var query = "DELETE FROM " + table + " WHERE ";
            switch (table) {
                case "alumnos":
                    query += "idAlumno = " + id;
                    break;
                case "profesores":
                    query += "idProfesor = " + id;
                    break;
                case "asignaturas":
                    query += "idAsignatura = " + id;
                    break;
            }
            db.run(query);
        },
        search: function (table, text, callback) {
            var query = "SELECT * FROM " + table + " WHERE ";
            switch (table) {
                case "alumnos":
                    query += " nombre LIKE '%" + text + "%' OR" +
                        " apellidos LIKE '%" + text + "%' OR" +
                        " email LIKE '%" + text + "%'";
                    break;
                case "profesores":
                    query += " nombre LIKE '%" + text + "%' OR" +
                        " apellidos LIKE '%" + text + "%' OR" +
                        " email LIKE '%" + text + "%'";
                    break;
                case "asignaturas":
                    query += " nombre LIKE '%" + text + "%' OR" +
                        " descripcion LIKE '%" + text + "%'";
                    break;
            }
            db.all(query, function (err, rows) {
                if (rows.length > 0) {
                    return callback(rows)
                } else {
                    return callback(null);
                }
            });
        }
    }
};

function createDb() {
    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS alumnos (" +
            "idAlumno INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "nombre varchar(20), " +
            "apellidos varchar(50), " +
            "email varchar(50), " +
            "asignaturas varchar(200))");
        db.run("CREATE TABLE IF NOT EXISTS asignaturas (" +
            "idAsignatura INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "nombre varchar(20), " +
            "descripcion varchar(50), " +
            "profesor INT, " +
            "FOREING KEY profesor REFERENCES profesores(idProfesor))");
        db.run("CREATE TABLE IF NOT EXISTS profesores (" +
            "idProfesor INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "nombre varchar(20), " +
            "apellidos varchar(50), " +
            "email varchar(50), " +
            "asignatura varchar(20))");

        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas)              VALUES ('jose', 'velasco', 'jose@jose.com', " +
            "'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas)              VALUES ('diego', 'pastor', 'diego@diego.com', " +
            "'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");
        db.run("INSERT INTO alumnos(nombre, apellidos, email, asignaturas)              VALUES ('laura', 'carmona', 'laura@laura.com', " +
            "'sistemas, servicios, base de datos, aplicaciones, seguridad, empresa')");

        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('Susana','Lopez','sulogo@gmail.com','servicios')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('Raul','Jimenez','rajibe@gmail.com','sistemas')");
        db.run("INSERT INTO profesores(nombre, apellidos, email, asignatura) VALUES('Luisa','Oliver','economia.iliberis@gmail.com','empresa')");

        db.run("INSERT INTO asignaturas(nombre, descripcion, profesor)           VALUES('Servicios','servicios description',1)");
        db.run("INSERT INTO asignaturas(nombre, descripcion, profesor)           VALUES('Sistemas','sistemas description',2)");
        db.run("INSERT INTO asignaturas(nombre, descripcion, profesor)           VALUES('Sistemas','sitemas description',3)");
    });
}
//createDb();

module.exports = _SQLITE;
