/**
 * Created by root on 13/02/16.
 */

var mongoose = require('mongoose');

module.exports= {
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
};


