// src/components/Questionnaire/Question.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import speechbubble from '../../assets/speechbubble.png';
import '../../styles/App.css';

const Question = ({ question, index, onAnswer, weight }) => {
  const handleAnswer = (answer) => {
    console.log(`Button clicked: ${answer}`);
    onAnswer(index, answer, weight);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${speechbubble})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '60px',
        minHeight: '400px', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom sx={{ textAlign: 'center' }}>{question}</Typography>
      <Box sx={{ display: 'flex', gap: 2, marginTop: '20px' }}>
        <Button variant="contained" onClick={() => handleAnswer('agree')}>Agree</Button>
        <Button variant="contained" onClick={() => handleAnswer('neutral')}>Neutral</Button>
        <Button variant="contained" onClick={() => handleAnswer('disagree')}>Disagree</Button>
        <Button variant="contained" onClick={() => handleAnswer('skip')}>Skip</Button>
      </Box>
    </Box>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  weight: PropTypes.object.isRequired,
};

export default Question;
