/**
 * Created by root on 13/02/16.
 */
var passport = require('passport'),
    TwitterStrategy  = require('passport-twitter').Strategy,
    mongoose = require('mongoose'),
    User = require("../schemas/users"),
    twitterConfig = require('./appsData/twitter.js');

module.exports = function(passport) {
    passport.use('twitter', new TwitterStrategy({
            consumerKey     : twitterConfig.apikey,
            consumerSecret  : twitterConfig.apisecret,
            callbackURL     : twitterConfig.callbackURL
        },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                if (err)  return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.twitter.lastStatus = profile._json.status.text;
                    console.log(newUser.twitter);
                    newUser.save(function(err) {
                        if (err)  throw err;
                        return done(null, newUser);
                    });
                }
            });

        });

    }));
};