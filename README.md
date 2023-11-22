# Getting Started with ffmpeg

## tech stack

- nodejs@16.20..0
- yarn@1.22.19
- videojs@8*
- ffmpeg@?
- React@18*
- materialUI@?
- Express@?

## Starting the project locally for development

- $ cd application/client
- $ yarn
- $ yarn start
- $ cd application/server
- $ yarn
- $ yarn start

### tutorials and references

- https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#readme
- [ffmpeg tutorials](https://creatomate.com/ffmpeg-tutorials)
- https://javascript.plainenglish.io/building-a-simple-video-transcoding-service-with-node-and-ffmpeg-271b2e73d5e0
- https://blog.logrocket.com/generating-video-previews-with-node-js-and-ffmpeg/

- https://betterprogramming.pub/how-to-process-video-with-ffmpeg-and-nodejs-940a8e510791
- https://digitalfortress.tech/tips/encode-videos-with-ffmpeg/

- https://stackoverflow.com/questions/44939166/ffmpeg-how-to-produce-mp4-cenc-common-encryption-videos

### npm packages

- https://www.npmjs.com/package/fluent-ffmpeg
- https://www.npmjs.com/package/ffmpeg-stream

### node streaming with ffmpeg

- https://stackoverflow.com/questions/33725893/how-do-you-use-node-js-to-stream-an-mp4-file-with-ffmpeg
- https://trac.ffmpeg.org/wiki/StreamingGuide
  
### streaming video node

- https://www.100ms.live/blog/nodejs-video-streaming-server

### use ffmpeg with no npm packages

- https://gist.github.com/steveh/514882
  
### serving images

- https://stackoverflow.com/questions/34828581/read-a-file-using-http-in-node-js

### node api

- https://nodesource.com/blog/dive-into-NodeJs-streams/
- https://css-tricks.com/web-streams-everywhere-and-fetch-for-node-js/
- https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
  
### ffmpag commands

- ffmpeg -i "http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8" -map 0:v:4 -map 0:a:0 -map 0:a:1 -c copy -bsf:a aac_adtstoasc "bipbop.mp4"
- ffmpeg -i "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8" -map 0:v:5 -map 0:a:0 -map 0:a:1 -c copy -bsf:a aac_adtstoasc "sintel.mp4"

### Online image creation/editing

- https://new.express.adobe.com/
  