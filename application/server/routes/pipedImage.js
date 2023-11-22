var path = require('path');
var fs = require("fs");
var express = require('express');
var http = require('http');
var router = express.Router();

/* GET piped image. */
router.get('/:image', function(req, res, next) {
  const fileName = req.params.image;
  const directory = path.resolve(__dirname, '../assets/test-image.png');
  var file = fs.readFileSync(directory);
  // http.get(path(directory, (image) => {
  //   console.log(image);
  //   image.pipe(res);
  // }));
  // cannot pipe...
  // res.pipe(file);
  res.send(file);
});

module.exports = router;
