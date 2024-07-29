// src/components/HomePage/HomePage.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'left', paddingTop: '20px', paddingBottom: '20px', color: 'black' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: '20px' }}>
          Welcome to the Cardano Rewards Simulator
        </Typography>
        <Typography variant="body1" gutterBottom>
        The Cardano Rewards Simulator is a support tool designed to compare and highlight user preferences within blockchain parameters, stemming from the blockchain trilemma and the crucial aspect of adoption for Cardano. These preferences are collected through a questionnaire and presented as a color code for easy comparison. Additionally, the simulator includes a rewards schedule that explains the functions and processes of individual parameters. Lastly, the simulator allows users to modify parameters, demonstrating their impact on the future development of various factors.
        </Typography>
        <Box sx={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" component={Link} to="/questionnaire" sx={{ marginRight: '10px' }}>
            Questionnaire
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/infopage" sx={{ marginRight: '10px' }}>
            Reward Model
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/simulator">
            Simulator
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
