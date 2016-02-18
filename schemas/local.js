/**
 * Created by root on 14/02/16.
 */
var passport = require('passport'),
    mongoose = require('mongoose');


module.exports= mongoose.model('local', {
    id: String,
    username: String,
    password: String,
    email: String
});


