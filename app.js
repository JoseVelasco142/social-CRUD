var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require("express-session"),
    passport = require('passport'),
    initPassport = require('./passport/init');

var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/users');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// SESSION && PASSPORT
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index')(passport),
/*    login = require('./routes/local_login'),*/
    sqlite = require('./routes/sqlite'),
    mongo = require('./routes/mongo');


app.use('/', routes);
/*app.use('/login_local', login);*/
app.use('/sqlite',sqlite);
app.use('/mongo',mongo);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
