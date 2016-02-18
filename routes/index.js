var express = require('express'),
    passport = require('passport'),
    local = require('../passport/local'),
    register = require('../passport/register'),
    router = express.Router();

router.post('/login', function(req, res) {
    local(req.body.email, req.body.password, function(valid, user){
        console.log("VALID"+valid+" user"+user);
        if(valid != null){
            if(valid){
                req.user = user;
                res.send("http://localhost:3000/dbSwitch");
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
router.get('/dbSwitch', function(req, res){
    if(req.query.db == null){
        res.render('dbSwitch', { user: req.user });
    } else {
        if(req.query.db == "sqlite")
            res.redirect("http://localhost:3000/sqlite");
        else
            res.redirect("http://localhost:3000/mongo");
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

    return router;
};




