import React, { useRef } from 'react';
import {
  Typography,
  Paper,
  Box,
} from '@mui/material';
// import AppLayout from '../Layout/AppLayout';
// import Authn from '../../components/Authn';
import VideoJsPlayer from './VideoJsPlayer'

import classes from './Video.styles';

function Video() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    // html5: {
    //   vhs: {
    //     overrideNative: true
    //   },
    //   nativeAudioTracks: false,
    //   nativeVideoTracks: false
    // },
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    // The controlBar interface has at least 2 different ways to define it here
    // This seemed to work pretty good but still doesn't give absolute control of 
    // what shown in the control bar and there is some css which allows for showing
    // all the appropriate controls: See ../VideoJsPlayer/VideoJsPlayer.css
    // children: { 
    controlBar: {
      playToggle: true,
      volumePanel: {
        inline: false,
      },
      volumeMenuButton: true,
      currentTimeDisplay: true,
      timeDivider: false,
      remainingTimeDisplay: false,
      progressControl: true,
      durationDisplay: true,
      audioTrackButton: true,
      subtitlesButton: true,
      pictureInPictureToggle: false,
      fullscreenToggle: true,
    },
    // },
    sources: [{
      // src: 'http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multi_language_subs.m3u8',  // blocked by cors
      // src: 'http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multichannel_subs.m3u8', // blocked by cors
      // src: 'http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_stereo_subs.m3u8', // blocked by cors
      // src: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8', // not found
      // src: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8', // only one audio track
      // src: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8', // only one audio track
      // src: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8', // only one audio track
      // src: 'https://mtoczko.github.io/hls-test-streams/test-gap/playlist.m3u8', // only one audio track
      // src: 'https://mtoczko.github.io/hls-test-streams/test-gap-audio-video/playlist.m3u8',
      // src: 'https://diceyk6a7voy4.cloudfront.net/e78752a1-2e83-43fa-85ae-3d508be29366/hls/fitfest-sample-1_Ott_Hls_Ts_Avc_Aac_16x9_1280x720p_30Hz_6.0Mbps_qvbr.m3u8',
      // src: 'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
      // src: 'http://d1v1s2of9ivmbp.cloudfront.net/Multi_Audio/hls_v3_10m/Pukar/index.m3u8',
      // src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8', // * plays over http and has audio tracks
      src: 'http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8', // * plays over http and has audio tracks
      type: 'application/x-mpegURL',
      // src: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd',
      // src: 'https://dash.akamaized.net/dash264/TestCasesUHD/2b/11/MultiRate.mpd',
      // src: 'https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd',
      // src: 'https://dash.akamaized.net/dash264/TestCases/2c/qualcomm/1/MultiResMPEG2.mpd',
      // src: 'https://dash.akamaized.net/dash264/TestCasesHD/2b/qualcomm/1/MultiResMPEG2.mpd',
      // src: 'http://ftp.itec.aau.at/datasets/DASHDataset2014/BigBuckBunny/1sec/BigBuckBunny_1s_onDemand_2014_05_09.mpd',
      // src: 'https://media.axprod.net/TestVectors/v7-Clear/Manifest_1080p.mpd',
      // type: 'application/dash+xml',
      // type: 'video/mp4',
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    const currentTimeDisplay = playerRef.current.controlBar.children_.find((control) => control.name() === 'CurrentTimeDisplay');

    let reqId = 0;
    player.on('play', (event) => {
      reqId = requestAnimationFrame(function play() {
        currentTimeDisplay.updateContent(event);
        reqId = requestAnimationFrame(play);
      });
    });

    // You can handle player events here, for example:
    player.on('loadedmetadata', () => {
      console.log('videojs player has loaded video metadata');
      const audio = player.audioTracks();
      debugger;
      // look for audio and text tracks when this event executes
    });

    player.on('waiting', () => {
      console.log('videojs player is waiting');
    });

    player.on('pause', () => {
      console.log('videojs player is paused');
      cancelAnimationFrame(reqId);
    });

    player.on('ended', () => {
      console.log('videojs player has ended');
      cancelAnimationFrame(reqId);
    });

    player.on('dispose', () => {
      console.log('videojs player will dispose');
      cancelAnimationFrame(reqId);
    });
  };

  return (
    <Paper>
      <Box sx={{ ...classes.video }}>
        <Typography className="title" variant="h2">Your Videos</Typography>
      </Box>
      <Box sx={{ ...classes.videoPlayer }}>
        <Box className="player-size">
          <VideoJsPlayer options={videoJsOptions} onReady={handlePlayerReady} />
        </Box>
      </Box>
    </Paper>
  );
}

export default Video;
