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

module.exports = _SQLITE;
