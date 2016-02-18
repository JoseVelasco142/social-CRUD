/**
 * Created by root on 13/02/16.
 */
var mongoose = require('mongoose'),
    User = require("../schemas/local");

module.exports = function(body, done) {
    User.findOne({'email': body.email}, function (err, user) {
        if (err) throw err;
        if (user) {
            return done(false);
        } else {
            var newUser = new User();
            newUser.username = body.name;
            newUser.email = body.email;
            newUser.password = body.password;
            newUser.save(function (err) {
                if (err)
                    throw err;
                return done(newUser);
            });
        }
    });
};
