var express = require('express'),
    passport = require('passport'),
    local = require('../passport/local'),
    register = require('../passport/register'),
    router = express.Router();

    var fakeUser = null;

router.post('/login', function(req, res) {
    var email  = req.body.email;
    var password = req.body.password;
    local(email, password, function(valid, user){
        if(valid != null){
            if(valid){
                fakeUser = user;
                res.send("http://localhost:3000/fakeSwitch");
            }
            else
                res.send(valid);
        } else {
            res.send(null);
        }
    });
});
router.post('/register', function(req, res) {
    register(req.body, function(valid) {
        if(!valid){
            res.send(valid);
        } else{
            res.send(true);
        }
    });
});
router.get('/register', function(req, res) {
    res.render('register', {title: "Nuevo usuario"});
});
router.get('/fakeSwitch', function(req, res){
    if(fakeUser == undefined) res.redirect("/");
    if(req.query.db == null){
        res.render('dbSwitch', { user: fakeUser, link: "fakeSwitch" });
    }
});

module.exports = function(passport){
    router.get('/', function(req, res) {
        res.render('index', { title: "dbNode" });
    });

    router.get('/signout', function(req, res) {
        fakeUser = null;
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
            successRedirect : '/dbSwitch',
            failureRedirect : '/'
        })
    );

    router.get('/dbSwitch', isAuthenticated, function(req, res){
        if(req.query.db == null){
            res.render('dbSwitch', { user: req.user });
        } else {
            if(req.query.db == "sqlite")
                res.redirect("http://localhost:3000/sqlite");
            else
                res.redirect("http://localhost:3000/mongo");
        }
    });

    return router;
};

var isAuthenticated = function (req, res, next) {
   if (req.isAuthenticated())
        return next();
    res.redirect('/');
};




