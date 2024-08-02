import React from 'react';
import Diagram from './Diagram';
import { Container, Typography, Box } from '@mui/material';

const InfoPage = () => {
  return (
    <Container maxWidth={false} sx={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', width: '100%', minHeight: 'calc(100vh - 64px)' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: '20px', color: 'black' }}>
        Reward Model
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: 'black', maxWidth: '800px', margin: '0 auto' }}>
        Take a look at the reward distribution model of Cardano and check out each parameter by clicking on.
      </Typography>
      <Box sx={{ marginTop: '20px', height: 'calc(100vh - 280px)', width: '100%' }}> {/* Adjusted height to ensure footer is not overlapped */}
        <Diagram />
      </Box>
    </Container>
  );
};

export default InfoPage;
