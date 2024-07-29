// src/components/InfoPage/InfoPage.js
import React from 'react';
import Diagram from './Diagram';
import { Container, Typography, Box } from '@mui/material';

const InfoPage = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'left', paddingTop: '20px', paddingBottom: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: '20px', color: 'black' }}>
        Reward Model
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
        Take a look at the reward distribution model of Cardano and check out each parameter by clicking on.
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
        <Diagram />
      </Box>
    </Container>
  );
};

export default InfoPage;
