import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import userBack from '../../assets/userBack.png';  // Import the background image
import user from '../../assets/user.png';  // Import the user image

const colorRanges = {
  decentralization: ['#FF0000', '#00FF00'], // Rot zu Grün
  scalability: ['#0000FF', '#FFFF00'], // Blau zu Gelb
  security: ['#00FFFF', '#FF00FF'], // Cyan zu Magenta
  adoption: ['#FFA500', '#800080'], // Orange zu Lila
};

const calculateColor = (score, minColor, maxColor) => {
  const mix = (color1, color2, weight) => {
    const d2h = d => d.toString(16).padStart(2, '0');
    const h2d = h => parseInt(h, 16);

    const col1 = color1.slice(1).match(/.{2}/g).map(h2d);
    const col2 = color2.slice(1).match(/.{2}/g).map(h2d);

    const result = col1.map((c1, i) => d2h(Math.floor(c1 + (col2[i] - c1) * weight)));

    return `#${result.join('')}`;
  };

  return mix(minColor, maxColor, (score + 1) / 2);
};

const combineColors = (colors) => {
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = (r, g, b) => {
    const toHex = (c) => c.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const totalRgb = colors.reduce(
    (acc, color) => {
      const [r, g, b] = hexToRgb(color);
      return [acc[0] + r, acc[1] + g, acc[2] + b];
    },
    [0, 0, 0]
  );

  const averageRgb = totalRgb.map(c => Math.floor(c / colors.length));
  return rgbToHex(averageRgb[0], averageRgb[1], averageRgb[2]);
};

const Evaluation = () => {
  const location = useLocation();
  const scores = location.state?.scores || { decentralization: 0, scalability: 0, security: 0, adoption: 0 }; // Fallback-Werte

  useEffect(() => {
    console.log('Scores received for evaluation:', scores);
  }, [scores]);

  const decentralizationColor = calculateColor(scores.decentralization, ...colorRanges.decentralization);
  const scalabilityColor = calculateColor(scores.scalability, ...colorRanges.scalability);
  const securityColor = calculateColor(scores.security, ...colorRanges.security);
  const adoptionColor = calculateColor(scores.adoption, ...colorRanges.adoption);

  const overallColor = combineColors([
    decentralizationColor,
    scalabilityColor,
    securityColor,
    adoptionColor,
  ]);

  console.log('Overall Color:', overallColor);

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', position: 'relative' }}>
      <Box sx={{ position: 'relative', width: '100%', height: '500px', backgroundImage: `url(${userBack})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Box sx={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '900px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'white' }}>Decentralization</Typography>
              <Box sx={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: decentralizationColor, margin: '0 auto' }} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'white' }}>Scalability</Typography>
              <Box sx={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: scalabilityColor, margin: '0 auto' }} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'white' }}>Security</Typography>
              <Box sx={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: securityColor, margin: '0 auto' }} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'white' }}>Adoption</Typography>
              <Box sx={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: adoptionColor, margin: '0 auto' }} />
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center', marginTop: '40px', color: 'white' }}>
            <Typography variant="h5">Your Color:</Typography>
            <Box sx={{ position: 'relative', width: '120px', height: '80px', margin: '20px auto' }}>
              <img src={user} alt="User" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1, width: '120px', height: 'auto' }} />
              <Box sx={{ width: '100%', height: '100%', backgroundColor: overallColor, zIndex: 0, borderRadius: '5px', marginTop: '60px' }} />
            </Box>
            <Typography variant="body1" sx={{ marginTop: '10px' }}>{overallColor}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

Evaluation.propTypes = {
  scores: PropTypes.object.isRequired,
};

export default Evaluation;
