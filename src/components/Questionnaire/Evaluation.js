import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import userBack from '../../assets/userBack.png';
import user from '../../assets/user.png';

const colorRanges = {
  decentralization: ['#FF0000', '#00FF00'],
  scalability: ['#0000FF', '#FFFF00'],
  security: ['#00FFFF', '#FF00FF'],
  adoption: ['#FFA500', '#800080'],
};

const calculateColor = (score, minColor, maxColor) => {
  const mix = (color1, color2, weight) => {
    const d2h = d => d.toString(16).padStart(2, '0');
    const h2d = h => parseInt(h, 16);

    const col1 = minColor.slice(1).match(/.{2}/g).map(h2d);
    const col2 = maxColor.slice(1).match(/.{2}/g).map(h2d);

    const result = col1.map((c1, i) => d2h(Math.floor(c1 + (col2[i] - c1) * weight)));

    return `#${result.join('')}`;
  };

  return mix(minColor, maxColor, (score + 1) / 2);
};

const calculateResultColor = (results) => {
  const avgColor = (colors) => {
    const h2d = h => parseInt(h, 16);
    const d2h = d => d.toString(16).padStart(2, '0');

    const avgCols = [0, 1, 2].map(i =>
      Math.floor(colors.reduce((acc, color) => acc + h2d(color.slice(1)[i * 2] + color.slice(1)[i * 2 + 1]), 0) / colors.length)
    );

    return `#${avgCols.map(d2h).join('')}`;
  };

  const decentralizationColor = calculateColor(results.decentralization, ...colorRanges.decentralization);
  const scalabilityColor = calculateColor(results.scalability, ...colorRanges.scalability);
  const securityColor = calculateColor(results.security, ...colorRanges.security);
  const adoptionColor = calculateColor(results.adoption, ...colorRanges.adoption);

  return avgColor([decentralizationColor, scalabilityColor, securityColor, adoptionColor]);
};

const Evaluation = () => {
  const location = useLocation();
  const scores = location.state?.scores || [];

  const calculateResult = (scores) => {
    const totalScores = scores.reduce((acc, score) => {
      return {
        decentralization: acc.decentralization + score.decentralization,
        scalability: acc.scalability + score.scalability,
        security: acc.security + score.security,
        adoption: acc.adoption + score.adoption,
      };
    }, { decentralization: 0, scalability: 0, security: 0, adoption: 0 });

    const count = scores.length;

    return {
      decentralization: totalScores.decentralization / count,
      scalability: totalScores.scalability / count,
      security: totalScores.security / count,
      adoption: totalScores.adoption / count,
    };
  };

  const result = calculateResult(scores);

  const decentralizationColor = calculateColor(result.decentralization, ...colorRanges.decentralization);
  const scalabilityColor = calculateColor(result.scalability, ...colorRanges.scalability);
  const securityColor = calculateColor(result.security, ...colorRanges.security);
  const adoptionColor = calculateColor(result.adoption, ...colorRanges.adoption);

  const overallColor = calculateResultColor({
    decentralization: result.decentralization,
    scalability: result.scalability,
    security: result.security,
    adoption: result.adoption,
  });

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', position: 'relative' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ marginTop: '20px', color: 'black' }}>
        Evaluation
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: 'black', marginBottom: '40px' }}>
        This is your overall evaluation based on the questionnaire results.
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>
        <img src={userBack} alt="Background" style={{ width: '100%', maxWidth: '900px', marginBottom: '20px' }} />
        <Box sx={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '900px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'white' }}>Decentralization</Typography>
              <Box sx={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: decentralizationColor, margin: '0 auto' }} />
              <Box sx={{ background: `linear-gradient(to right, ${colorRanges.decentralization[0]}, ${colorRanges.decentralization[1]})`, height: 10, width: '180px', margin: '10px auto', position: 'relative', borderRadius: '5px', display: 'inline-block' }}>
                <Box sx={{ position: 'absolute', left: `${(result.decentralization + 1) * 50}%`, width: 2, height: '100%', backgroundColor: 'black' }} />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'white' }}>Scalability</Typography>
              <Box sx={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: scalabilityColor, margin: '0 auto' }} />
              <Box sx={{ background: `linear-gradient(to right, ${colorRanges.scalability[0]}, ${colorRanges.scalability[1]})`, height: 10, width: '180px', margin: '10px auto', position: 'relative', borderRadius: '5px', display: 'inline-block' }}>
                <Box sx={{ position: 'absolute', left: `${(result.scalability + 1) * 50}%`, width: 2, height: '100%', backgroundColor: 'black' }} />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'white' }}>Security</Typography>
              <Box sx={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: securityColor, margin: '0 auto' }} />
              <Box sx={{ background: `linear-gradient(to right, ${colorRanges.security[0]}, ${colorRanges.security[1]})`, height: 10, width: '180px', margin: '10px auto', position: 'relative', borderRadius: '5px', display: 'inline-block' }}>
                <Box sx={{ position: 'absolute', left: `${(result.security + 1) * 50}%`, width: 2, height: '100%', backgroundColor: 'black' }} />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'white' }}>Adoption</Typography>
              <Box sx={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: adoptionColor, margin: '0 auto' }} />
              <Box sx={{ background: `linear-gradient(to right, ${colorRanges.adoption[0]}, ${colorRanges.adoption[1]})`, height: 10, width: '180px', margin: '10px auto', position: 'relative', borderRadius: '5px', display: 'inline-block' }}>
                <Box sx={{ position: 'absolute', left: `${(result.adoption + 1) * 50}%`, width: 2, height: '100%', backgroundColor: 'black' }} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', marginBottom: '10px', zIndex: 2, position: 'relative' }}>Your Color:</Typography>
          <Box sx={{ width: '150px', height: '250px', backgroundColor: overallColor, borderRadius: '5px', marginBottom: '10px', zIndex: 1 }} />
          <img src={user} alt="User" style={{ width: '200px', position: 'absolute', top: 0, zIndex: 1 }} />
          <Typography variant="body1" sx={{ color: 'white', marginTop: '10px', zIndex: 2, position: 'relative' }}>{overallColor}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

Evaluation.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.object),
};

export default Evaluation;
