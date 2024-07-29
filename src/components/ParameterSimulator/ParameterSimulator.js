// src/components/ParameterSimulator/ParameterSimulator.js
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Container, Typography, Box, TextField, Button } from '@mui/material';

const ParameterSimulator = () => {
  const [parameters, setParameters] = useState({
    stakeAmount: 1000, // Example value
    poolPerformance: 0.9, // Example value
    // Add more parameters as needed
  });

  const [simulationResults, setSimulationResults] = useState([]);

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setParameters({ ...parameters, [name]: value });
  };

  const runSimulation = () => {
    // Implement the logic for simulation and updating the results
    const results = Array.from({ length: 50 }, (_, i) => parameters.stakeAmount * Math.pow(parameters.poolPerformance, i)); // Example calculation
    setSimulationResults(results);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'left', paddingTop: '20px', paddingBottom: '20px', color: 'black' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: '20px' }}>
        Parameter Simulator
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="body1" gutterBottom>
          Here you can simulate rewards based on different parameters.
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Parameters
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Stake Amount"
            type="number"
            name="stakeAmount"
            value={parameters.stakeAmount}
            onChange={handleParameterChange}
            variant="outlined"
          />
          <TextField
            label="Pool Performance"
            type="number"
            name="poolPerformance"
            value={parameters.poolPerformance}
            onChange={handleParameterChange}
            variant="outlined"
          />
          {/* Add more parameters as needed */}
          <Button variant="contained" onClick={runSimulation}>Run Simulation</Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" component="h2" gutterBottom>
          Simulation Results
        </Typography>
        <Plot
          data={[
            {
              x: Array.from({ length: 50 }, (_, i) => i + 1),
              y: simulationResults,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
            },
          ]}
          layout={{ width: 720, height: 440, title: 'Simulation Results' }}
        />
      </Box>
    </Container>
  );
};

export default ParameterSimulator;
