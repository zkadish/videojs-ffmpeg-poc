const http = require('http');
var path = require('path');
var fs = require('fs');
var express = require('express');
var ffmpeg = require('fluent-ffmpeg');
var router = express.Router();

/* GET Request video. */
router.get('/*', function(req, res, next) {
  // TODO: switching between video formats will determine url...
  const requestUrl = req.url;
  const baseUrl = 'http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced';
  console.log('Request video!', requestUrl);
  const url = `${baseUrl}${requestUrl}`;
  const watermark = path.resolve(__dirname, '../assets/watermark-test.png');
  // const assetsFolder = path.resolve(__dirname, '../assets/');
  // const videoPath = path.resolve(__dirname, '../assets/bipbop.mp4');

  let videoInfo = null;
  ffmpeg.ffprobe(url, (err, info) => {
    if (err) {
      console.log(err);
    }
    videoInfo = info.format;
    console.log(videoInfo);
  });

  // const command = ffmpeg(fs.createReadStream(videoPath)) // does not allow pipe to res

  // NOTE: Can't save and pipe at the same time???
  // const saveCommand = ffmpeg(url) // need to re-encode to mp4 in order to add watermark or encrypt
  //   .videoCodec('libx264') // mp4 video codec
  //   .audioCodec('libmp3lame') // mp4 audio codec
  //   .format('mp4') // is required to pipe response and must be correct format and save?
  //   .outputOptions('-movflags frag_keyframe+empty_moov') // is required to pipe response and save?
  //   .on('end', function () {
  //     console.log('Stream Done');
  //   })
  //   .on('error', function (err) {
  //     console.log('an error happened: ' + err.message);
  //     res.send(err.message);
  //   })
  //   .save(`${assetsFolder}/bipbop_output_01.mp4`);


  // const saveCommand = ffmpeg() // need to re-encode to mp4 in order to add watermark or encrypt
  //   .input(url)
  //   .outputOptions([
  //     '-map 0:v:4',
  //     '-map 0:a:0',
  //     '-map 0:a:1',
  //     '-c copy',
  //     '-bsf:a aac_adtstoasc',
  //   ])
  //   // .videoCodec('libx264') // mp4 video codec
  //   // .audioCodec('libmp3lame') // mp4 audio codec
  //   // .format('mp4') // is required to pipe response and must be correct format and save?
  //   // .outputOptions('-movflags frag_keyframe+empty_moov') // is required to pipe response and save?
  //   .on('end', function () {
  //     console.log('Stream Done');
  //   })
  //   .on('error', function (err) {
  //     console.log('an error happened: ' + err.message);
  //     res.send(err.message);
  //   })
  //   .save(`${assetsFolder}/bipbop_output_01.mp4`);

  // The following code gets video from url as m8u3 converts it to mp4 and pipes the video to the client
  // This is amazing because ffmpeg does it in real time...
  // NOTE: there is something wrong with the duration of the output video...
  // NOTE: ffmpeg is @ version 6.0.0 and has been updated recently...
  // NOTE: fluent-ffmpeg hasn't been published in 7 years! However, there looks to be some recent activity :D
  // TODO: pass duration to player...
  // const command = ffmpeg(url) // need to re-encode to mp4 in order to add watermark or encrypt
  //   // .videoCodec('libx264') // mp4 video codec
  //   // .audioCodec('libmp3lame') // mp4 audio codec
  //   .outputOptions('-movflags frag_keyframe+empty_moov') // is required to pipe response
  //   .format('mp4') // is required to pipe response and must be correct format
  //   // .outputOptions([
  //   //   '-movflags frag_keyframe+empty_moov',
  //   //   '-map 0:v:4',
  //   //   '-map 0:a:0',
  //   //   '-map 0:a:1',
  //   //   '-c copy',
  //   //   '-bsf:a aac_adtstoasc',
  //   // ])
  //   .duration(1800)
  //   .on('error', function (err) {
  //     console.log('an error happened: ' + err.message);
  //     res.send(err.message);
  //   })
  //   .on('end', function () {
  //     console.log('Stream Done');
  //   })
  //   .on('progress', function(progress) {
  //     console.log('Processing: ' + progress.percent + '% done');
  //   });
  //   command.pipe(res, { end: true });

  const command = ffmpeg() // need to re-encode to mp4 in order to add watermark or encrypt
    .input(url)
    .input(watermark)
    // .videoCodec('libx264') // mp4 video codec
    // .audioCodec('libmp3lame') // mp4 audio codec
    // .outputOptions('-movflags frag_keyframe+empty_moov') // is required to pipe response
    .format('mp4') // is required to pipe response and must be correct format
    .outputOptions([
      '-movflags frag_keyframe+empty_moov',
      '-filter_complex [0][1]overlay=x=0:y=0',
    ])
    .duration(1800)
    .on('error', function (err) {
      console.log('an error happened: ' + err.message);
      res.send(err.message);
    })
    .on('end', function () {
      console.log('Stream Done');
    })
    .on('progress', function(progress) {
      console.log('Processing: ' + progress.percent + '% done');
    });
    command.pipe(res, { end: true });




  // // the following code passes a downloaded video.mp4 to the client
  // const videoOnServer = ffmpeg(videoPath)
  //   .format('mp4') // is required to pipe response and must be correct format
  //   .outputOptions('-movflags frag_keyframe+empty_moov') // is required to pipe response
  //   .on('end', function () {
  //       console.log('Stream Done');
  //   })
  //   .on('error', function (err) {
  //       console.log('an error happened: ' + err.message);
  //       res.send(err.message);
  //   })
  //   .pipe(res, { end: true })
  
  // if not piping to client you can see data with data event
  // const ffStream = command.pipe();
  // ffStream.on('data', function(chunk) {
  //   console.log('ffmpeg just wrote ' + chunk.length + ' bytes');
  // });

  // get m8u3 video stream and pipe it to the player in the client
  // http.get(url, (video) => {
  //   const headers = video.headers;
    
  //   // console.log(headers);
  //   // TODO: add watermark and encode video with ffmpeg
  //   video.pipe(res, { end: true });
  // });
});

module.exports = router;
