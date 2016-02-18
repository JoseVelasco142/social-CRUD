/**
 * Created by root on 13/02/16.
 */
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    mongoose = require('mongoose'),
    User = require("../schemas/users"),
    fbConfig = require('./appsData/facebook.js');

module.exports = function(passport) {
    passport.use('facebook', new FacebookStrategy({
            clientID        : fbConfig.appID,
            clientSecret    : fbConfig.appSecret,
            callbackURL     : fbConfig.callbackUrl,
            profileFields : ['id', 'displayName', 'emails','photos']
        },
        function(access_token, refresh_token, profile, done) {
            process.nextTick(function() {
                User.findOne({ 'id' : profile.id },
                    function(err, user) {
                        if (err)  return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.facebook.id    = profile.id;
                        newUser.facebook.access_token = access_token;
                        newUser.facebook.firstName  = profile.name.givenName;
                        newUser.facebook.lastName = profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
            });

        })
    );
};
