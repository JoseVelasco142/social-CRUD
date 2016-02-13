/**
 * Created by root on 11/02/16.
 */

var mongoose = require('mongoose');

module.exports= mongoose.model('users', {
    local: {
        id: String,
        username: String,
        password: String,
        email: String
    },
    facebook: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        username: String,
        displayName: String,
        lastStatus: String
    }
});


