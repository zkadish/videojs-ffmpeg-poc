const classes = {
  video: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '.actions': {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '24px',
      width: '800px',
    },
    '.card': {
      width: `220px`,
      minHeight: `260px`,
    },
    '.contentIcon': {
      textAlign: 'center',
    },
    '.icon': {
      width: '100px',
      height: '100px',
    },
    '.title': {
      margin: '24px 0',
    },
    '.message': {
      margin: '0 24px 0 0',
    },
  },
  videoPlayer: {
    display: 'flex',
    justifyContent: 'center',
    // border: '1px solid red',
    paddingBottom: '48px',
    '.player-size': {
      width: '600px',
      // height: '600px',
    }
  }
}

export default classes;
