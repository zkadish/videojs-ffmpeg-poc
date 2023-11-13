const http = require('http');
var express = require('express');
var router = express.Router();

/* GET Request video. */
router.get('/*', function(req, res, next) {
  // TODO: switching between video formats will determine url...
  const requestUrl = req.url;
  const baseUrl = 'http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced';
  console.log('Request video!', requestUrl);
  const url = `${baseUrl}${requestUrl}`;

  http.get(url, (video) => {
    const headers = video.headers;
    console.log(headers);
    // TODO: add watermark and encode video with ffmpeg
    video.pipe(res);
  })
});

module.exports = router;
