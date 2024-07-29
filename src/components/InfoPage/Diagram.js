import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useEdgesState, useNodesState, addEdge } from 'react-flow-renderer';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import '../../styles/App.css';

const CENTER_X = 300;
const OFFSET_X = 150;

const initialNodes = [
  { id: '1', position: { x: CENTER_X, y: 0 }, data: { label: 'ADA Reserves' }, type: 'input' },
  { id: '2', position: { x: CENTER_X + 5 * OFFSET_X, y: 0 }, data: { label: 'Total Transaction Fees' }, type: 'input' },
  { id: '3', position: { x: CENTER_X + 1 * OFFSET_X, y: 100 }, data: { label: 'monetaryExpandRate * Performance of all stake Pools' }, type: 'default' },
  { id: '4', position: { x: CENTER_X + 3 * OFFSET_X, y: 200 }, data: { label: 'Total Reward Pot' }, type: 'default' },
  { id: '5', position: { x: CENTER_X - 2 * OFFSET_X, y: 200 }, data: { label: 'Unclaimed Rewards' }, type: 'default' },
  { id: '6', position: { x: CENTER_X + 2 * OFFSET_X, y: 300 }, data: { label: '1 - treasuryGrowthRate' }, type: 'default' },
  { id: '7', position: { x: CENTER_X, y: 400 }, data: { label: 'Stake Pool Rewards Pot' }, type: 'default' },
  { id: '10', position: { x: CENTER_X, y: 500 }, data: { label: 'Rewards Equation for Pool n' }, type: 'default' },
  { id: '13', position: { x: CENTER_X, y: 600 }, data: { label: 'Stake Pool n' }, type: 'default' },
  { id: '14', position: { x: CENTER_X - 1 * OFFSET_X, y: 700 }, data: { label: 'margin & minPoolCost' }, type: 'default' },
  { id: '15', position: { x: CENTER_X + 1 * OFFSET_X, y: 700 }, data: { label: 'rewards' }, type: 'default' },
  { id: '16', position: { x: CENTER_X - 2 * OFFSET_X, y: 800 }, data: { label: 'Operators' }, type: 'default' },
  { id: '17', position: { x: CENTER_X + 2 * OFFSET_X, y: 800 }, data: { label: 'Delegators' }, type: 'default' },
  { id: '18', position: { x: CENTER_X - 1 * OFFSET_X, y: 900 }, data: { label: 'Stake Pool Registrations + Deregistrations' }, type: 'default' },
  { id: '19', position: { x: CENTER_X + 1 * OFFSET_X, y: 900 }, data: { label: 'Stake Key registrations + deregistrations' }, type: 'default' },
  { id: '20', position: { x: CENTER_X, y: 1000 }, data: { label: 'Deposits' }, type: 'default' },
  { id: '21', position: { x: CENTER_X + 2 * OFFSET_X, y: 1100 }, data: { label: 'unclaimed Refunds for retired Pools' }, type: 'default' },
  { id: '22', position: { x: CENTER_X + 3 * OFFSET_X, y: 1200 }, data: { label: 'Treasury' }, type: 'default' },
  { id: '23', position: { x: CENTER_X + 3 * OFFSET_X, y: 1300 }, data: { label: 'Payouts e.g. for Project Catalyst' }, type: 'output' },
  { id: '24', position: { x: CENTER_X + 4 * OFFSET_X, y: 900 }, data: { label: 'Rewards going to deregistered stake addresses' }, type: 'default' },
  { id: '25', position: { x: CENTER_X + 5 * OFFSET_X, y: 800 }, data: { label: 'Treasury Growth rate' }, type: 'default' },
];

const initialEdges = [
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e1-4', source: '1', target: '4', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-7', source: '3', target: '7', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e4-6', source: '4', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e7-1', source: '7', target: '1', animated: true },
  { id: 'e7-13', source: '7', target: '13', animated: true },
  { id: 'e13-14', source: '13', target: '14', animated: true },
  { id: 'e13-15', source: '13', target: '15', animated: true },
  { id: 'e14-16', source: '14', target: '16', animated: true },
  { id: 'e15-17', source: '15', target: '17', animated: true },
  { id: 'e16-20', source: '16', target: '20', animated: true },
  { id: 'e17-20', source: '17', target: '20', animated: true },
  { id: 'e20-22', source: '20', target: '22', animated: true },
  { id: 'e22-23', source: '22', target: '23', animated: true },
  { id: 'e20-21', source: '20', target: '21', animated: true },
  { id: 'e16-18', source: '16', target: '18', animated: true },
  { id: 'e17-19', source: '17', target: '19', animated: true },
  { id: 'e7-22', source: '7', target: '22', animated: true },
  { id: 'e7-24', source: '7', target: '24', animated: true },
  { id: 'e4-25', source: '4', target: '25', animated: true },
];

const nodeDescriptions = {
  'ADA Reserves': 'The total amount of ADA held in reserves for staking rewards.',
  'Total Transaction Fees': 'The sum of all transaction fees collected during the epoch.',
  'monetaryExpandRate * Performance of all stake Pools': 'The monetary expansion rate multiplied by the performance of all stake pools.',
  'Total Reward Pot': 'The total amount of ADA available for distribution as rewards in an epoch.',
  'Unclaimed Rewards': 'Rewards that have been generated but not yet claimed by any stakeholders.',
  '1 - treasuryGrowthRate': 'The remaining percentage of rewards after the treasury growth rate has been deducted.',
  'Stake Pool Rewards Pot': 'The total rewards allocated to all stake pools in an epoch.',
  'Rewards Equation for Pool n': 'The formula used to calculate rewards for a specific stake pool.',
  'Stake Pool n': 'A specific stake pool participating in the staking process.',
  'margin & minPoolCost': 'The margin and minimum cost associated with running a stake pool.',
  'rewards': 'The rewards distributed to delegators and pool operators.',
  'Operators': 'The individuals or entities responsible for running stake pools.',
  'Delegators': 'Individuals who delegate their ADA to stake pools to earn rewards.',
  'Stake Pool Registrations + Deregistrations': 'The process of registering and deregistering stake pools.',
  'Stake Key registrations + deregistrations': 'The process of registering and deregistering stake keys.',
  'Deposits': 'The deposits made for registering stake pools and keys.',
  'unclaimed Refunds for retired Pools': 'Refunds that have not been claimed by retired stake pools.',
  'Treasury': 'The treasury where a portion of the rewards is allocated for funding community projects.',
  'Payouts e.g. for Project Catalyst': 'Payouts made from the treasury for community projects like Project Catalyst.',
  'Rewards going to deregistered stake addresses': 'Rewards allocated to stake addresses that have been deregistered.',
  'Treasury Growth rate': 'The rate at which the treasury grows from the total rewards.',
};

const Diagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleElementClick = (event, node) => {
    setSelectedNode(node);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNode(null);
  };

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleElementClick}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedNode?.data?.label}</DialogTitle>
        <DialogContent>
          <Typography>
            {nodeDescriptions[selectedNode?.data?.label]}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Diagram;
