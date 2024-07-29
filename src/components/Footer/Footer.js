// src/components/Footer/Footer.js
import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#424242', color: 'white', padding: '20px 0', marginTop: 'auto' }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body1">
            &copy; {new Date().getFullYear()} Cardano Rewards Simulator. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="https://cardanofoundation.org" target="_blank" color="inherit" underline="hover">
              Cardano Foundation
            </Link>
            <Link href="https://cardanoacademy.io" target="_blank" color="inherit" underline="hover">
              Cardano Academy
            </Link>
            <Link href="https://github.com" target="_blank" color="inherit" underline="hover">
              GitHub
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
