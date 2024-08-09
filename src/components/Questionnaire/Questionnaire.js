import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import NavigationBar from './NavigationBar';
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
  'Placeholder question 11',
  'Placeholder question 12',
  'Placeholder question 13',
  'Placeholder question 14',
  'Placeholder question 15',
  'Placeholder question 16',
  'Placeholder question 17',
  'Placeholder question 18',
  'Placeholder question 19',
  'Placeholder question 20',
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
  { decentralization: 0.1, scalability: 0.1, security: 0, adoption: 0 },
  { decentralization: 0, scalability: 0.1, security: 0.1, adoption: 0 },
  { decentralization: 0, scalability: 0, security: 0.1, adoption: 0.1 },
  { decentralization: 0.1, scalability: 0, security: 0, adoption: 0.1 },
  { decentralization: -0.1, scalability: -0.1, security: 0, adoption: 0 },
  { decentralization: 0, scalability: -0.1, security: -0.1, adoption: 0 },
  { decentralization: 0, scalability: 0, security: -0.1, adoption: -0.1 },
  { decentralization: -0.1, scalability: 0, security: 0, adoption: -0.1 },
  { decentralization: 0.1, scalability: 0, security: 0.1, adoption: -0.1 },
  { decentralization: -0.1, scalability: 0.1, security: -0.1, adoption: 0 },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));
  const [scores, setScores] = useState({ decentralization: 0, scalability: 0, security: 0, adoption: 0 });
  const navigate = useNavigate();

  const handleAnswer = (index, answer, weight) => {
    console.log(`Handling answer for question ${index + 1}:`, answer);
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);

    const newScores = { ...scores };
    if (answer === 1) {
      newScores.decentralization = clamp(newScores.decentralization + weight.decentralization, -1, 1);
      newScores.scalability = clamp(newScores.scalability + weight.scalability, -1, 1);
      newScores.security = clamp(newScores.security + weight.security, -1, 1);
      newScores.adoption = clamp(newScores.adoption + weight.adoption, -1, 1);
    } else if (answer === -1) {
      newScores.decentralization = clamp(newScores.decentralization - weight.decentralization, -1, 1);
      newScores.scalability = clamp(newScores.scalability - weight.scalability, -1, 1);
      newScores.security = clamp(newScores.security - weight.security, -1, 1);
      newScores.adoption = clamp(newScores.adoption - weight.adoption, -1, 1);
    }
    console.log(`Updated scores:`, newScores);
    setScores(newScores);

    const nextHigherIndex = newAnswers.slice(index + 1).findIndex(answer => answer === null);
    if (nextHigherIndex !== -1) {
      setCurrentQuestionIndex(index + nextHigherIndex + 1);
    } else {
      const nextIndex = newAnswers.findIndex(answer => answer === null);
      if (nextIndex !== -1) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        console.log('All questions answered. Navigating to evaluation...');
        navigate('/evaluation', { state: { scores: newScores } });
      }
    }
  };

  const startQuestionnaire = () => {
    setCurrentQuestionIndex(0);
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '40px', color: 'black' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ marginTop: '20px' }}>
        Questionnaire
      </Typography>
      {currentQuestionIndex === -1 ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            The questionnaire is designed to capture user preferences across four dimensions: Scalability, Security, Decentralization (the Blockchain Trilemma), and Adoption, which is a crucial factor for Cardano.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Through 20 questions, the survey identifies user settings and preferences, creating a profile represented by a color code that reflects individual attitudes toward each dimension as well as an overall impression.
          </Typography>
          <Typography variant="h6" gutterBottom>
            In the future, it will be possible to compare your preferences with those of votes, DReps, or other users to gain better contextual insights.
          </Typography>
          <Typography variant="h6" gutterBottom>
            The questionnaire and its evaluation do not claim to be scientifically comprehensive or to encompass all aspects fully; rather, they aim to highlight basic attitudes and tendencies. 
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: '#424242', margin: '20px auto', padding: '10px 20px' }} onClick={startQuestionnaire}>Start</Button>
        </Box>
      ) : (
        <Box>
          <Question
            key={`question-${currentQuestionIndex}`}
            question={questions[currentQuestionIndex]}
            index={currentQuestionIndex}
            onAnswer={handleAnswer}
            weight={weights[currentQuestionIndex]}
          />
          <Box sx={{ marginTop: '40px' }}>
            <NavigationBar current={currentQuestionIndex} total={totalQuestions} onNavigate={goToQuestion} answers={answers} />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Questionnaire;
