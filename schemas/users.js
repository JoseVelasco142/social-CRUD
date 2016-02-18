/**
 * Created by root on 11/02/16.
 */
var passport = require('passport'),
    mongoose = require('mongoose');


module.exports= mongoose.model('users', {
    facebook: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String
    },
    twitter: {
        id: String,
        nombre: String,
        password: String,
        email: String
    }
});


