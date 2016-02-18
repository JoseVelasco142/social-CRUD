/**
 * Created by root on 13/02/16.
 */
var mongoose = require('mongoose'),
    User = require("../schemas/local");

module.exports = function(username, password, done) {
    User.findOne({'email': username}, function (err, user) {
        if(user != null) {
            if(user.password == password)
                return done(true, user);
            else
                return done(false, null);
        } else
            return done(null, null)
    });
};
