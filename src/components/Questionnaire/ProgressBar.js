import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" color="textSecondary">{`${current} / ${total}`}</Typography>
    </Box>
  );
};

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default ProgressBar;
