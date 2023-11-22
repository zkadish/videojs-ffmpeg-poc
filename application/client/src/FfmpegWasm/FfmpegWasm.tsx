import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// function FfmpegWasm () {
function FfmpegWasm () {
  const [loaded, setLoaded] = useState(false);

  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef<HTMLElement | null>(null);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
      messageRef.current ? messageRef.current.innerHTML = message : messageRef.current = null;
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same domain can be used directly.
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
    });
    setLoaded(true);
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    debugger;
    await ffmpeg.writeFile('input.webm', await fetchFile('https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm'));
    await ffmpeg.exec(['-i', 'input.webm', 'output.mp4']);
    const data = await ffmpeg.readFile('output.mp4');
    (videoRef.current as any).src =
      URL.createObjectURL(new Blob([(data as any).buffer], {type: 'video/mp4'}));
  }

  return (loaded
    ? (
        <>
          <video ref={videoRef} controls></video><br/>
          <button onClick={transcode}>Transcode webm to mp4</button>
          <Box component="p" ref={messageRef}></Box>
          <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
        </>
      )
    : (
      <button onClick={load}>Load ffmpeg-core (~31 MB)</button>
    )
  );
}
// }

export default FfmpegWasm;
