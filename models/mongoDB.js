/**
 * Created by root on 7/02/16.
 */
var mongoose = require('mongoose');
var colegio = require("../schemas/colegio");
mongoose.createConnection('mongodb://localhost/colegio');
var _MONGODB = {
    prototype: {
        selectAll: function (schema, callback) {
            var view = null;
            switch (schema) {
                case "alumnos":
                    view = colegio.alumnos;
                    break;
                case "profesores":
                    view = colegio.profesores;
                    break;
                case "asignaturas":
                    view = colegio.asignaturas;
                    break;
            }
            view.find().exec(function (err, results) {
                return callback(results);
            });
        },
        selectOne: function (schema, id, callback) {
            var view = null;
            switch (schema) {
                case "alumnos":
                    view = colegio.alumnos;
                    break;
                case "profesores":
                    view = colegio.profesores;
                    break;
                case "asignaturas":
                    view = colegio.asignaturas;
                    break;
            }
            view.findOne({_id: id}, function (err, result) {
                return callback(result);
            });
        },
        insertNew: function (schema, data, callback) {
            var view = null;
            var filter = null;
            delete data['v'];
            delete data['a'];
            switch (schema) {
                case "alumnos":
                    view = colegio.alumnos;
                    filter = {email: data.email};
                    break;
                case "profesores":
                    view = colegio.profesores;
                    filter = {email: data.email};
                    break;
                case "asignaturas":
                    view = colegio.asignaturas;
                    filter = {nombre: data.nombre};
                    break;
            }
            view.findOne(filter, function (err, result) {
                if (result <= 0) {
                    view.create(data);
                    view.findOne(filter, function (err, result) {
                        return callback(result);
                    });
                } else {
                    return callback(null);
                }
            });
        },
        updateOne: function (schema, data, callback) {
            var view = null;
            var obj = null;
            switch (schema) {
                case "alumnos":
                    view = colegio.alumnos;
                    obj =  {
                        nombre: data.nombre,
                        apellidos: data.apellidos,
                        email: data.email,
                        asignaturas: data.asignaturas
                    };
                    break;
                case "profesores":
                    view = colegio.profesores;
                    obj =  {
                        nombre: data.nombre,
                        apellidos: data.apellidos,
                        email: data.email,
                        asignatura: data.asignatura
                    };
                    break;
                case "asignaturas":
                    view = colegio.asignaturas;
                    obj =   {
                        nombre: data.nombre,
                        descripcion: data.descripcion,
                        profesor: data.profesor
                    };
                    break;
            }
            view.findOneAndUpdate({_id: data.k}, obj, {new: false},
                function (err, result) {
                    return callback(true);
            });
        },
        deleteOne: function (schema, id, callback) {
            var view = null;
            switch (schema) {
                case "alumnos":
                    view = colegio.alumnos;
                    break;
                case "profesores":
                    view = colegio.profesores;
                    break;
                case "asignaturas":
                    view = colegio.asignaturas;
                    break;
            }
            view.findOneAndRemove({_id: id}, function (err, result) {
               return callback(result);
            });
        },
        search: function (schema, text, callback) {
            var view = null;
            var filter = null;
            switch (schema) {
                case "alumnos":
                    view = colegio.alumnos;
                    filter = [
                        {nombre: new RegExp(text)},
                        {apellidos: new RegExp(text)},
                        {email: new RegExp(text)}
                    ];

                    break;
                case "profesores":
                    view = colegio.profesores;
                    filter = [
                        {nombre: new RegExp(text)},
                        {apellidos: new RegExp(text)},
                        {email: new RegExp(text)}
                    ];
                    break;
                case "asignaturas":
                    view = colegio.asignaturas;
                    filter = [
                        {nombre: new RegExp(text)},
                        {descripcion: new RegExp(text)}
                    ];
            }


            view.find({$or: filter},
                function (err, result) {
                    if (result.length > 0)
                        return callback(result);
                    else
                        return callback(null);
                });
        }
    }
};

module.exports = _MONGODB;

