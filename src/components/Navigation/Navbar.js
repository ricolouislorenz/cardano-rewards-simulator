// src/components/Navigation/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import websiteLogo from '../../assets/websiteLogo.png';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#424242' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img src={websiteLogo} alt="Website Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6" component="div">
              Cardano Rewards Simulator
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', gap: 2, marginLeft: 4 }}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/questionnaire">Questionnaire</Button>
            <Button color="inherit" component={Link} to="/infopage">Reward Model</Button>
            <Button color="inherit" component={Link} to="/simulator">Simulator</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" href="https://cardanofoundation.org" target="_blank">CF</Button>
          <Button color="inherit" href="https://cardanoacademy.io" target="_blank">Academy</Button>
          <Button color="inherit" href="https://github.com" target="_blank">GitHub</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
