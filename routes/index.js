var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeDB' });
});

router.get('/dbSelector', function(req, res) {
  res.render('dbSelector', { title: 'Selector de BD' });
});

module.exports = router;
