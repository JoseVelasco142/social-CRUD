/**
 * Created by root on 7/02/16.
 */
var mongoose = require('mongoose'),
    ObjectId = require('mongoose');

var _MONGODB = {
    database: {
        alumnos: mongoose.model('alumnos', {
            nombre: String,
            apellidos: String,
            email: String,
            asignaturas: String
        }),
        profesores: mongoose.model('profesores', {
            nombre: String,
            apellidos: String,
            email: String,
            asignatura: String
        }),
        asignaturas: mongoose.model('asignaturas', {
            nombre: String,
            descripcion: String,
            profesor: String
        })
    },
    prototype: {
        connect: function () {
            mongoose.connect('mongodb://localhost/colegio', function (err) {
                if (err)
                    console.log(err)
            });
        },
        closeConnection: function () {
            mongoose.connection.close();
        },
        selectAll: function (schema, callback) {
            var view = null;
            switch (schema) {
                case "alumnos":
                    view = _MONGODB.database.alumnos;
                    break;
                case "profesores":
                    view = _MONGODB.database.profesores;
                    break;
                case "asignaturas":
                    view = _MONGODB.database.asignaturas;
                    break;
            }
            _MONGODB.prototype.connect();
            view.find().exec(function (err, results) {
                _MONGODB.prototype.closeConnection();
                return callback(results);

            });
        },
        selectOne: function (schema, id, callback) {
            var view = null;
            switch (schema) {
                case "alumnos":
                    view = _MONGODB.database.alumnos;
                    break;
                case "profesores":
                    view = _MONGODB.database.profesores;
                    break;
                case "asignaturas":
                    view = _MONGODB.database.asignaturas;
                    break;
            }
            _MONGODB.prototype.connect();
            view.findOne({_id: id}, function (err, result) {
                _MONGODB.prototype.closeConnection();
                return callback(result);
            });
        },
        insertNew: function (schema, data, callback) {
            var view = null;
            delete data['v'];
            delete data['a'];
            _MONGODB.prototype.connect();
            switch (schema) {
                case "alumnos":
                    view = _MONGODB.database.alumnos;
                    view.findOne({email: data.email}, function (err, result) {
                        if (result <= 0) {
                            view.create(data);
                            view.findOne({email: data.email}, function (err, result) {
                                _MONGODB.prototype.closeConnection();
                                return callback(result);
                            });
                        } else {
                            _MONGODB.prototype.closeConnection();
                            return callback(null);
                        }
                    });
                    break;
                case "profesores":
                    view = _MONGODB.database.profesores;
                    view.findOne({email: data.email}, function (err, result) {
                        if (result <= 0) {
                            view.create(data);
                            view.findOne({email: data.email}, function (err, result) {
                                _MONGODB.prototype.closeConnection();
                                return callback(result);
                            });
                        } else {
                            _MONGODB.prototype.closeConnection();
                            return callback(null);
                        }
                    });
                    break;
                case "asignaturas":
                    view = _MONGODB.database.asignaturas;
                    view.findOne({nombre: data.nombre}, function (err, result) {
                        if (result <= 0) {
                            view.create(data);
                            view.findOne({nombre: data.nombre}, function (err, result) {
                                _MONGODB.prototype.closeConnection();
                                return callback(result);
                            });
                        } else {
                            _MONGODB.prototype.closeConnection();
                            return callback(null);
                        }
                    });
                    break;
            }
        },
        updateOne: function (schema, data, callback) {
            _MONGODB.prototype.connect();
            switch (schema) {
                case "alumnos":
                    _MONGODB.database.alumnos.findOneAndUpdate(
                        {_id: data.k},
                        {
                            nombre: data.nombre,
                            apellidos: data.apellidos,
                            email: data.email,
                            asignaturas: data.asignaturas
                        },
                        {new: false},
                        function (err, result) {
                            _MONGODB.prototype.closeConnection();
                            return callback(true);
                        });
                    break;
                case "profesores":
                    console.log(JSON.stringify(data));
                    _MONGODB.database.profesores.findOneAndUpdate(
                        {_id: data.k},
                        {
                            nombre: data.nombre,
                            apellidos: data.apellidos,
                            email: data.email,
                            asignatura: data.asignatura
                        },
                        {new: false},
                        function (err, result) {
                            _MONGODB.prototype.closeConnection();
                            return callback(true);
                        });
                    break;
                case "asignaturas":
                    _MONGODB.database.asignaturas.findOneAndUpdate(
                        {_id: data.k},
                        {
                            nombre: data.nombre,
                            descripcion: data.descripcion,
                            profesor: data.profesor
                        },
                        {new: false},
                        function (err, result) {
                            _MONGODB.prototype.closeConnection();
                            return callback(true);
                        });
                    break;
            }
        },
        deleteOne: function (schema, id) {
            var view = null;
            switch (schema) {
                case "alumnos":
                    view = _MONGODB.database.alumnos;
                    break;
                case "profesores":
                    view = _MONGODB.database.profesores;
                    break;
                case "asignaturas":
                    view = _MONGODB.database.asignaturas;
                    break;
            }
            _MONGODB.prototype.connect();
            view.findOneAndRemove({_id: id}, function (err, result) {
                _MONGODB.prototype.closeConnection();
            });
        },
        search: function (schema, text, callback) {
            _MONGODB.prototype.connect();
            switch (schema) {
                case "alumnos":
                    _MONGODB.database.alumnos.find(
                        {
                            $or: [
                                {nombre: new RegExp(text)},
                                {apellidos: new RegExp(text)},
                                {email: new RegExp(text)}
                            ]
                        },
                        function (err, result) {
                            _MONGODB.prototype.closeConnection();
                            if (result.length > 0)
                                return callback(result);
                            else
                                return callback(null);
                        });
                    break;
                case "profesores":
                    _MONGODB.database.profesores.find(
                        {
                            $or: [
                                {nombre: new RegExp(text)},
                                {apellidos: new RegExp(text)},
                                {email: new RegExp(text)}
                            ]
                        },
                        function (err, result) {
                            _MONGODB.prototype.closeConnection();
                            if (result.length > 0)
                                return callback(result);
                            else
                                return callback(null);
                        });
                    break;
                case "asignaturas":
                    _MONGODB.database.asignaturas.find(
                        {
                            $or: [
                                {nombre: new RegExp(text)},
                                {descripcion: new RegExp(text)}
                            ]
                        },
                        function (err, result) {
                            _MONGODB.prototype.closeConnection();
                            if (result.length > 0)
                                return callback(result);
                            else
                                return callback(null);
                        });
                    break;
            }
        }
    }
};

module.exports = _MONGODB;

