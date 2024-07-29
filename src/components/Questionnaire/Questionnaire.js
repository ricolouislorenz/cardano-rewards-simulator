// src/components/Questionnaire/Questionnaire.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { Container, Typography, Box, Button } from '@mui/material';
import '../../styles/App.css';

const questions = [
  'I would support a blockchain system where all users can make decisions equally.',
  'I would accept a blockchain system controlled by a central authority.',
  'A high degree of decentralization is more important than fast transaction times.',
  'The security features of a blockchain system are crucial for my usage.',
  'The privacy and security of my transactions are more important to me than the cost of using the system.',
  'I would not take additional steps to enhance the security of my blockchain transactions.',
  'I am willing to accept reduced participation opportunities if it improves the scalability of a blockchain system.',
  'Scalability should be prioritized to enable global applications of blockchain.',
  'A blockchain system should be able to process large volumes of transactions quickly.',
  'I trust a decentralized system more, even if it is harder to use.',
];

const totalQuestions = questions.length;

const weights = [
  { decentralization: 0.2, scalability: 0, security: 0, adoption: 0 },
  { decentralization: -0.2, scalability: 0, security: 0, adoption: 0 },
  { decentralization: 0.2, scalability: -0.2, security: 0, adoption: 0 },
  { decentralization: 0, scalability: 0, security: 0.2, adoption: 0 },
  { decentralization: 0, scalability: 0, security: 0.2, adoption: 0.2 },
  { decentralization: 0, scalability: 0, security: -0.2, adoption: 0 },
  { decentralization: 0, scalability: 0.2, security: 0, adoption: -0.2 },
  { decentralization: 0, scalability: 0.2, security: 0, adoption: 0.2 },
  { decentralization: 0, scalability: 0.2, security: 0, adoption: 0 },
  { decentralization: 0.2, scalability: 0, security: 0, adoption: -0.2 },
];

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));
  const [scores, setScores] = useState(Array(totalQuestions).fill({ decentralization: 0, scalability: 0, security: 0, adoption: 0 }));
  const navigate = useNavigate();

  const handleAnswer = (index, answer, weight) => {
    console.log(`Question ${index + 1} answered: ${answer}`);
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);

    const newScores = [...scores];
    newScores[index] = weight;
    setScores(newScores);

    console.log('Current answers:', newAnswers);
    console.log('Current scores:', newScores);
    console.log('Current Question Index:', currentQuestionIndex);

    if (index + 1 < totalQuestions) {
      setCurrentQuestionIndex(index + 1);
    } else {
      console.log('Navigating to evaluation with scores:', newScores);
      navigate('/evaluation', { state: { scores: newScores } });
    }
  };

  const startQuestionnaire = () => {
    setCurrentQuestionIndex(1);
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'left', paddingTop: '20px', paddingBottom: '20px', color: 'black' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: '20px' }}>
        Questionnaire
      </Typography>
      {currentQuestionIndex === 0 ? (
        <Box>
          <Typography variant="body1" gutterBottom>
            Welcome to the questionnaire. Click &quot;Start&quot; to begin.
          </Typography>
          <Button variant="contained" onClick={startQuestionnaire}>Start</Button>
        </Box>
      ) : (
        <Box>
          <Question
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex - 1]}
            index={currentQuestionIndex - 1}
            onAnswer={handleAnswer}
            weight={weights[currentQuestionIndex - 1]}
          />
          <Box sx={{ marginTop: '40px' }}>
            <ProgressBar current={currentQuestionIndex} total={totalQuestions} />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 4 }}>
              {[...Array(totalQuestions).keys()].map((index) => (
                <Button
                  key={index}
                  variant="contained"
                  onClick={() => goToQuestion(index + 1)}
                  sx={{ backgroundColor: currentQuestionIndex === index + 1 ? 'lightblue' : 'white', color: 'black', minWidth: '40px' }}
                >
                  {index + 1}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Questionnaire;
