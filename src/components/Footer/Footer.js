import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#424242', color: 'white', padding: '10px 0', width: '100%' }}>
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '0 40px' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Cardano Rewards Simulator. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/impressum" color="inherit" underline="hover" sx={{ fontSize: '0.8rem' }}>
            Legal Notice
          </Link>
          <Link href="/datenschutz" color="inherit" underline="hover" sx={{ fontSize: '0.8rem' }}>
            Privacy Policy
          </Link>
          <Link href="/agb" color="inherit" underline="hover" sx={{ fontSize: '0.8rem' }}>
            Terms of Use
          </Link>
          <Link href="/contact" color="inherit" underline="hover" sx={{ fontSize: '0.8rem' }}>
            Contact
          </Link>
          <Link href="https://cardanofoundation.org" target="_blank" color="inherit" underline="hover" sx={{ fontSize: '0.8rem' }}>
            Cardano Foundation
          </Link>
          <Link href="https://cardanoacademy.io" target="_blank" color="inherit" underline="hover" sx={{ fontSize: '0.8rem' }}>
            Cardano Academy
          </Link>
          <Link href="https://github.com/cardano-foundation/cf-java-rewards-calculation" target="_blank" color="inherit" underline="hover" sx={{ fontSize: '0.8rem' }}>
            GitHub
          </Link>
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'right' }}>
          Responsible for content according to § 55 Abs. 2 RStV: Rico Lorenz
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
