/**
 * Created by root on 7/02/16.
 */

var express = require('express'),
    router = express.Router(),
    _MONGODB = require('../models/mongoDB');

// SELECT

router.get('/', function (req, res, next) {
    var view = req.query.v;
    var key = req.query.k;
    var action = req.query.a;

    if (!action) {
        _MONGODB.prototype.selectAll(view, function (data) {
            res.render(view + '/showAll', {title: 'Todos los ' + view, data: data, db: "mongo"});
        });
    } else {
        switch (action) {
            case "add":
                res.render(view + '/addOne', {
                    title: 'Añadir ' + view, db: "mongo"
                });
                break;
            case "search":
                _MONGODB.prototype.search(view, key, function (data) {
                    if (data != null) {
                        if (data.length != 1)
                            res.render(view + '/showAll', {title: 'Todos los ' + view, data: data, db: "mongo"});
                        else
                            res.render(view + '/showOne', {
                                title: view + "-> " + data[0].nombre,
                                data: data[0],
                                db: "mongo"
                            });
                    } else {
                        res.render(view + '/showOne', {
                            title: 'Todos los ' + view,
                            err: "No se han encontrado datos",
                            db: "mongo"
                        });
                    }
                });
                break;
            case "show":
                _MONGODB.prototype.selectOne(view, key, function (data) {
                    if (data) {
                        res.render(view + '/showOne', {title: view + " " + data.nombre, data: data, db: "mongo"});
                    } else {
                        res.render(view + '/showOne', {
                            title: 'Todos los ' + view,
                            err: "No se han encontrado datos",
                            db: "mongo"
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
    _MONGODB.prototype.insertNew(table, req.body, function (data) {
        if (data != null)
            res.send(data['_id']);
        else
            res.send('1');
    });
});
//UPDATE
router.put('/', function (req, res) {
    var table = req.body['v'];
    console.log(JSON.stringify(req.body));
    _MONGODB.prototype.updateOne(table, req.body, function (ok) {
        if (ok) res.send(true);
    });
});
// DELETE
router.delete('/', function (req, res) {
    var view = req.query.v;
    var key = req.query.k;
    _MONGODB.prototype.deleteOne(view, key);
    res.send(true);
});

module.exports = router;