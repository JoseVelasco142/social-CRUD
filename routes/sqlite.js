/**
 * Created by root on 31/01/16.
 */
var express = require('express'),
    _SQLITE = require('../models/sqliteDB'),
    router = express.Router();

// SELECT
router.get('/', function (req, res, next) {
    var view = req.query.v;
    var key = req.query.k;
    var action = req.query.a;
    
    if (view == undefined)
        view = "alumnos";

    if (!action) {
        _SQLITE.prototype.selectAll(view, function (data) {
            res.render(view + '/showAll', {
                title: 'Todos los ' + view,
                data: data, db: "sqlite",
                user: req.user});
        });
    } else {
        switch (action) {
            case "add":
                res.render(view + '/addOne', {
                    title: 'Añadir ' +
                    view, db: "sqlite",
                    user: req.user
                });
                break;
            case "search":
                _SQLITE.prototype.search(view, key, function (data) {
                    if (data != null) {
                        if (data.length != 1)
                            res.render(view + '/showAll', {
                                title: 'Todos los ' + view,
                                data: data,
                                db: "sqlite",
                                user: req.user
                            });
                        else
                            res.render(view + '/showOne', {
                                title: view + "-> " + data[0].nombre,
                                data: data[0],
                                db: "sqlite",
                                user: req.user
                            });
                    } else {
                        res.render(view + '/showOne', {
                            title: 'Sin ' + view,
                            err: "No se han encontrado datos",
                            db: "sqlite",
                            user: req.user
                        });
                    }
                });
                break;
            case "show":
                _SQLITE.prototype.selectOne(view, key, function (data) {
                    if (data) {
                        res.render(view + '/showOne', {
                            title: view + " " + data[0].nombre,
                            data: data[0],
                            db: "sqlite",
                            user: req.user
                        });
                    } else {
                        res.render(view + '/showOne', {
                            title: 'Sin ' + view,
                            err: "No se han encontrado datos",
                            db: "sqlite",
                            user: req.user
                        });
                    }
                });
                break
        }
    }
});
//INSERT
router.post('/', function (req, res) {
    var table = req.body['v'];
    _SQLITE.prototype.insertNew(table, req.body, function (data) {
        if (data != null) {
            var key = null;
            switch (table) {
                case "alumnos":
                    key = data.idAlumno;
                    break;
                case "profesores":
                    key = data.idProfesor;
                    break;
                case "asignaturas":
                    key = data.idAsignatura;
                    console.log("CNTRL SQLITE LINE 80: " + key);
                    break;
            }
            res.send(key + "");
        } else {
            res.send('1');
        }
    });
});
//UPDATE
router.put('/', function (req, res) {
    _SQLITE.prototype.updateOne(req.body, function (ok) {
        if (ok)
            res.send(true);
    });
});
// DELETE
router.delete('/', function (req, res) {
    var view = req.query.v;
    var key = req.query.k;
    _SQLITE.prototype.deleteOne(view, key);
    res.send(true);
});

module.exports = router;