var express = require('express');
var router = express.Router();

/* GET health check listing. */
router.get('/', function(req, res, next) {
  res.send('Health check is Rocking and Rolling!');
});

module.exports = router;
