import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4} sx={{ paddingTop: '40px', paddingBottom: '40px', justifyContent: 'center', textAlign: 'center' }}>
        <Grid item xs={12}>
          <Box sx={{ color: 'black' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ marginTop: '20px', marginBottom: '40px' }}>
              Welcome to the Cardano Rewards Simulator
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: '40px' }}>
              The Cardano Rewards Simulator is a support tool designed to compare and highlight user preferences within blockchain parameters. These preferences, collected through a questionnaire, are presented as a color code for easy comparison. The simulator includes a rewards schedule that explains individual parameter functions and processes. Users can also modify parameters to see their impact on the future development of various factors.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: '40px' }}>
              This application serves three main purposes. Firstly, it collects user preferences to represent individual values and create comparability for contexts like DReps, pools, and votes. Secondly, it provides a detailed representation of the rewards model with explanations of its components. Lastly, the parameter simulator allows users to create projections for rewards, fees, and reserves, or calculate how profit maximization can be achieved.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: '40px' }}>
              For further in-depth knowledge, please refer to the following sources: the Cardano Academy for general information about blockchain and Cardano, the Cardano website for details on Cardano and other projects, and the GitHub page for a deeper insight into the reward model and calculations.
            </Typography>
            <Box sx={{ marginTop: '40px' }}>
              <Button variant="contained" sx={{ backgroundColor: '#424242', marginRight: '20px', padding: '10px 20px' }} component={Link} to="/questionnaire">
                Questionnaire
              </Button>
              <Button variant="contained" sx={{ backgroundColor: '#424242', marginRight: '20px', padding: '10px 20px' }} component={Link} to="/infopage">
                Reward Model
              </Button>
              <Button variant="contained" sx={{ backgroundColor: '#424242', padding: '10px 20px' }} component={Link} to="/simulator">
                Simulator
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
