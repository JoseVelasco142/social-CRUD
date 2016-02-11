/**
 * Created by root on 31/01/16.
 */
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    if(req.body.login) {
        var mail = req.body.mail;
        var password = req.body.password;
        console.log(mail+"  "+password);
        if((mail != "") && (password != ""))
            res.send("http://localhost:3000/dbSelector")

    } else if (req.body.logOut) {
        res.send("http://localhost:3000")
    }
});

module.exports = router;