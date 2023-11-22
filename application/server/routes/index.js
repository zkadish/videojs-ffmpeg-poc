var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express Rocks' });
  res.send('This is the index file!');
});

module.exports = router;
