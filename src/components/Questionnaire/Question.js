import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import speechbubble from '../../assets/speechbubble.png';
import '../../styles/App.css';

const Question = ({ question, index, onAnswer, weight }) => {
  useEffect(() => {
    console.log(`Rendering question ${index + 1}: ${question}`);
  }, [question, index]);

  const handleAnswer = (answer) => {
    console.log(`Answer for question ${index + 1}:`, answer);
    const weightedAnswer = {
      decentralization: weight.decentralization * answer,
      scalability: weight.scalability * answer,
      security: weight.security * answer,
      adoption: weight.adoption * answer,
    };
    onAnswer(index, answer, weightedAnswer);
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
        <Button variant="contained" sx={{ backgroundColor: '#424242' }} onClick={() => handleAnswer(1)}>Agree</Button>
        <Button variant="contained" sx={{ backgroundColor: '#424242' }} onClick={() => handleAnswer(0)}>Neutral</Button>
        <Button variant="contained" sx={{ backgroundColor: '#424242' }} onClick={() => handleAnswer(-1)}>Disagree</Button>
        <Button variant="contained" sx={{ backgroundColor: '#424242' }} onClick={() => handleAnswer(null)}>Skip</Button>
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
