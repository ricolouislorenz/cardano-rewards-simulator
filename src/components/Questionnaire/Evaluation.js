// src/components/Questionnaire/Evaluation.js
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

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
  const avgColor = (color1, color2, color3, color4) => {
    const h2d = h => parseInt(h, 16);
    const d2h = d => d.toString(16).padStart(2, '0');

    const cols = [color1, color2, color3, color4].map(col => col.slice(1).match(/.{2}/g).map(h2d));
    const avgCols = cols[0].map((_, i) => Math.floor(cols.reduce((acc, col) => acc + col[i], 0) / cols.length));

    return `#${avgCols.map(d2h).join('')}`;
  };

  const decentralizationColor = calculateColor(results.decentralization, ...colorRanges.decentralization);
  const scalabilityColor = calculateColor(results.scalability, ...colorRanges.scalability);
  const securityColor = calculateColor(results.security, ...colorRanges.security);
  const adoptionColor = calculateColor(results.adoption, ...colorRanges.adoption);

  return avgColor(decentralizationColor, scalabilityColor, securityColor, adoptionColor);
};

const Evaluation = () => {
  const location = useLocation();
  const scores = location.state?.scores || [];

  const calculateResult = (scores) => {
    return scores.reduce((acc, score) => {
      return {
        decentralization: acc.decentralization + score.decentralization,
        scalability: acc.scalability + score.scalability,
        security: acc.security + score.security,
        adoption: acc.adoption + score.adoption,
      };
    }, { decentralization: 0, scalability: 0, security: 0, adoption: 0 });
  };

  const result = calculateResult(scores);

  const decentralizationColor = calculateColor(result.decentralization, ...colorRanges.decentralization);
  const scalabilityColor = calculateColor(result.scalability, ...colorRanges.scalability);
  const securityColor = calculateColor(result.security, ...colorRanges.security);
  const adoptionColor = calculateColor(result.adoption, ...colorRanges.adoption);

  const overallColor = calculateResultColor(result);

  return (
    <Container maxWidth="md" sx={{ textAlign: 'left', paddingTop: '20px', paddingBottom: '20px', color: 'black' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: '20px' }}>
        Evaluation
      </Typography>
      <Box sx={{ textAlign: 'left', color: 'black' }}>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1">Decentralization</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ background: `linear-gradient(to right, ${colorRanges.decentralization[0]}, ${colorRanges.decentralization[1]})`, height: 20, width: '200px', marginRight: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', left: `${(result.decentralization + 1) * 50}%`, width: 2, height: '100%', backgroundColor: 'black' }} />
            </Box>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: decentralizationColor }} />
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1">Scalability</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ background: `linear-gradient(to right, ${colorRanges.scalability[0]}, ${colorRanges.scalability[1]})`, height: 20, width: '200px', marginRight: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', left: `${(result.scalability + 1) * 50}%`, width: 2, height: '100%', backgroundColor: 'black' }} />
            </Box>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: scalabilityColor }} />
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1">Security</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ background: `linear-gradient(to right, ${colorRanges.security[0]}, ${colorRanges.security[1]})`, height: 20, width: '200px', marginRight: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', left: `${(result.security + 1) * 50}%`, width: 2, height: '100%', backgroundColor: 'black' }} />
            </Box>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: securityColor }} />
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1">Adoption</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ background: `linear-gradient(to right, ${colorRanges.adoption[0]}, ${colorRanges.adoption[1]})`, height: 20, width: '200px', marginRight: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', left: `${(result.adoption + 1) * 50}%`, width: 2, height: '100%', backgroundColor: 'black' }} />
            </Box>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: adoptionColor }} />
          </Box>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="body1">Overall Color</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: overallColor, marginRight: 2 }} />
            <Typography variant="body2">{overallColor}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

Evaluation.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.object),
};

export default Evaluation;
