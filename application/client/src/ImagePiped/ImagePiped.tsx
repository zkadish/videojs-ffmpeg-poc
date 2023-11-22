import {
  Typography,
  Paper,
  Box,
} from '@mui/material';

import './ImagePiped.css';
// import classes from './ImagePiped.styles';

function ImagePiped() {
  return (
    <Paper>
      <Box sx={{ width: '100vw'}}>
        <Typography variant="h2">Piped Image</Typography>
        <img className="image-piped" src="piped-image/test-image.png" alt="testing" />
      </Box>
    </Paper>
  );
}

export default ImagePiped;
