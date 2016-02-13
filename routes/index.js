var express = require('express'),
    passport = require('passport'),
    router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
};

module.exports = function(passport){
    router.get('/', function(req, res) {
        res.render('index', { title: "dbNode" });
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true
    }));

    router.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/dbSwitch',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/login/facebook',
        passport.authenticate('facebook', { scope : 'email' }
        ));

    router.get('/login/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/dbSwitch',
            failureRedirect : '/'
        })
    );

    router.get('/login/twitter',
        passport.authenticate('twitter'));

    router.get('/login/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/twitter',
            failureRedirect : '/'
        })
    );

    router.get('/twitter', isAuthenticated, function(req, res){
        res.render('twitter', { user: req.user });
    });

    router.get('/dbSwitch', isAuthenticated, function(req, res){
        if(req.query.db == null){
            res.render('dbSwitch', { user: req.user });
        } else {
            if(req.query.db == "sqlite")
                res.redirect("http://localhost:3000/sqlite");
            else
                res.redirect("http://localhost:3000/mongo");

            /*switch (req.query.db) {
                case "sqlite":
                    res.redirect("http://localhost:3000/sqlite");
                    break;
                case "mongo":
                    res.redirect("http://localhost:3000/mongo");
                    break;
            }*/

        }
    });

    return router;
};




