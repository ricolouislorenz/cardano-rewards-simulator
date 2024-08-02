import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Container, Typography, Box, Button, Slider, Grid, Tabs, Tab } from '@mui/material';
import axios from 'axios';

const defaultParameters = {
  stakeAmount: 1000,
  poolPerformance: 0.9,
  initialReserve: 1e16,
  epochs: 50,
  rho: 0.003,
  tau: 0.2,
  eta: 0.97,
  p: 0.6,
  frew: 0.78,
  fees: 0.01,
};

const ParameterSimulator = () => {
  const [parameters, setParameters] = useState(defaultParameters);
  const [simulationResults, setSimulationResults] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentData, setCurrentData] = useState({});

  const handleParameterChange = (name, value) => {
    setParameters({ ...parameters, [name]: value });
  };

  const runSimulation = async () => {
    const endpoint = currentTab === 1 ? 'simulate' : 'simulate';
    try {
      const response = await axios.post(`http://localhost:5000/api/${endpoint}`, parameters);
      setSimulationResults(response.data);
    } catch (error) {
      console.error('Error running simulation:', error);
    }
  };

  const fetchCurrentData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/currentData');
      setCurrentData(response.data);
    } catch (error) {
      console.error('Error fetching current data:', error);
    }
  };

  const resetParameters = () => {
    setParameters(defaultParameters);
  };

  useEffect(() => {
    fetchCurrentData();
  }, []);

  useEffect(() => {
    if (currentTab !== 0) {
      runSimulation();
    }
  }, [parameters, currentTab]);

  const renderSlider = (label, name, min, max, step) => (
    <Grid item xs={12} key={name}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography gutterBottom>{label}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{min}</Typography>
          <Slider
            value={parameters[name]}
            min={min}
            max={max}
            step={step}
            onChange={(e, value) => handleParameterChange(name, value)}
            valueLabelDisplay="auto"
            sx={{ marginX: 2, flexGrow: 1 }}
          />
          <Typography>{max}</Typography>
        </Box>
      </Box>
    </Grid>
  );

  const renderSimulationResults = () => {
    return (
      <Plot
        data={[
          {
            x: Array.from({ length: parameters.epochs }, (_, i) => i),
            y: simulationResults,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          width: '100%',
          height: 440,
          title: 'Simulation Results',
          xaxis: { title: 'Epochs' },
          yaxis: { title: 'Value' },
        }}
      />
    );
  };

  const renderDashboard = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Current Data
      </Typography>
      <Plot
        data={[
          {
            x: [new Date(currentData.time * 1000)],
            y: [currentData.height],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'green' },
          },
        ]}
        layout={{
          width: '100%',
          height: 440,
          title: 'Current Data',
          xaxis: { title: 'Time' },
          yaxis: { title: 'Height' },
        }}
      />
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', color: 'black' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: '20px' }}>
        Cardano Simulator
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ marginBottom: '40px' }}>
        Dieser Bereich ist noch under Construction...
      </Typography>
      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} centered>
        <Tab label="Dashboard" />
        <Tab label="Reserve/Rewards/Fees Simulation" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {currentTab === 0 ? renderDashboard() : renderSimulationResults()}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Parameter
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {renderSlider('Stake Amount', 'stakeAmount', 100, 10000, 100)}
            {renderSlider('Pool Performance', 'poolPerformance', 0.5, 1.5, 0.01)}
            {renderSlider('Initial Reserve', 'initialReserve', 1e15, 1e17, 1e15)}
            {renderSlider('Epochs', 'epochs', 10, 100, 1)}
            {renderSlider('Rho', 'rho', 0.001, 0.01, 0.001)}
            {renderSlider('Tau', 'tau', 0.1, 0.5, 0.05)}
            {renderSlider('Eta', 'eta', 0.9, 1.0, 0.01)}
            {renderSlider('p', 'p', 0.5, 1.0, 0.05)}
            {renderSlider('frew', 'frew', 0.5, 1.0, 0.05)}
          </Grid>
          {currentTab !== 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button variant="contained" sx={{ backgroundColor: '#424242' }} onClick={runSimulation}>
                run Simulation
              </Button>
              <Button variant="outlined" onClick={resetParameters}>
                Reset to Default
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ParameterSimulator;
