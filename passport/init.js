/**
 * Created by root on 13/02/16.
 */
var passport = require('passport'),
    facebook = require('./facebook'),
    twitter = require('./twitter'),
    User = require("../schemas/users");

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    facebook(passport);
    twitter(passport);
};