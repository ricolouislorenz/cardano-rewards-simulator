// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Evaluation from './components/Questionnaire/Evaluation';
import HomePage from './components/HomePage/HomePage';
import InfoPage from './components/InfoPage/InfoPage';
import ParameterSimulator from './components/ParameterSimulator/ParameterSimulator';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';

import bg1 from './assets/bg1.png';
import bg2 from './assets/bg2.png';
import bg3 from './assets/bg3.png';
import bg4 from './assets/bg4.png';

const backgrounds = {
  '/': bg1,
  '/questionnaire': bg2,
  '/infopage': null, // No background for InfoPage
  '/evaluation': bg4,
  '/simulator': bg3, // Add background for the simulator page
};

const BackgroundWrapper = ({ children }) => {
  const location = useLocation();
  const background = backgrounds[location.pathname];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: background ? `url(${background})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </Box>
  );
};

BackgroundWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <CssBaseline />
      <BackgroundWrapper>
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/infopage" element={<InfoPage />} />
            <Route path="/evaluation" element={<Evaluation />} />
            <Route path="/simulator" element={<ParameterSimulator />} />
          </Routes>
        </Box>
        <Footer />
      </BackgroundWrapper>
    </Router>
  );
}

export default App;
