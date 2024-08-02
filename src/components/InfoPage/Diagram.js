import React, { useState, useEffect, useRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useEdgesState, useNodesState, Handle, useReactFlow, ReactFlowProvider } from 'react-flow-renderer';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import '../../styles/App.css';

const CENTER_X = 300;
const OFFSET_X = 150;

const CustomNode = ({ id, data, isConnectable }) => (
  <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, backgroundColor: data.color || '#fff' }}>
    <Handle
      type="source"
      position="top"
      id="top"
      style={{ background: '#555' }}
      isConnectable={isConnectable}
    />
    <Handle
      type="source"
      position="bottom"
      id="bottom"
      style={{ background: '#555' }}
      isConnectable={isConnectable}
    />
    <div>{data.label}</div>
    <Handle
      type="target"
      position="top"
      id="top"
      style={{ background: '#555' }}
      isConnectable={isConnectable}
    />
    <Handle
      type="target"
      position="bottom"
      id="bottom"
      style={{ background: '#555' }}
      isConnectable={isConnectable}
    />
  </div>
);

CustomNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
  isConnectable: PropTypes.bool.isRequired,
};

const nodeTypes = {
  customNode: CustomNode,
};

const initialNodes = [
  { id: '1', position: { x: CENTER_X, y: 0 }, data: { label: 'ADA Reserves', color: '#4DBDC7' }, type: 'customNode' },
  { id: '2', position: { x: CENTER_X + 5 * OFFSET_X, y: 0 }, data: { label: 'Total Transaction Fees', color: '#8A6791' }, type: 'customNode' },
  { id: '3', position: { x: CENTER_X + 1 * OFFSET_X, y: 100 }, data: { label: 'Monetary Expansion Rate * Performance of All Stake Pools', color: '#AF6B66' }, type: 'customNode' },
  { id: '4', position: { x: CENTER_X + 3 * OFFSET_X, y: 200 }, data: { label: 'Total Reward Pot', color: '#8A6791' }, type: 'customNode' },
  { id: '5', position: { x: CENTER_X - 2 * OFFSET_X, y: 200 }, data: { label: 'Unclaimed Rewards', color: '#AF6B66' }, type: 'customNode' },
  { id: '6', position: { x: CENTER_X + 2 * OFFSET_X, y: 300 }, data: { label: '1 - Treasury Growth Rate', color: '#AF6B66' }, type: 'customNode' },
  { id: '7', position: { x: CENTER_X, y: 400 }, data: { label: 'Stake Pool Rewards Pot', color: '#8A6791' }, type: 'customNode' },
  { id: '10', position: { x: CENTER_X - 1 * OFFSET_X, y: 500 }, data: { label: 'Rewards Equation for Pool n', color: '#AF6B66' }, type: 'customNode' },
  { id: '13', position: { x: CENTER_X, y: 600 }, data: { label: 'Stake Pool n', color: '#F0A724' }, type: 'customNode' },
  { id: '14', position: { x: CENTER_X - 1 * OFFSET_X, y: 700 }, data: { label: 'Margin & Minimum Pool Cost', color: '#AF6B66' }, type: 'customNode' },
  { id: '15', position: { x: CENTER_X + 1 * OFFSET_X, y: 700 }, data: { label: 'Rewards', color: '#AF6B66' }, type: 'customNode' },
  { id: '16', position: { x: CENTER_X - 2 * OFFSET_X, y: 800 }, data: { label: 'Operators', color: '#ffffff' }, type: 'customNode' },
  { id: '17', position: { x: CENTER_X + 2 * OFFSET_X, y: 800 }, data: { label: 'Delegators', color: '#ffffff' }, type: 'customNode' },
  { id: '18', position: { x: CENTER_X - 2 * OFFSET_X, y: 900 }, data: { label: 'Stake Pool Registrations & Deregistrations', color: '#AF6B66' }, type: 'customNode' },
  { id: '19', position: { x: CENTER_X + 1 * OFFSET_X, y: 900 }, data: { label: 'Stake Key Registrations & Deregistrations', color: '#AF6B66' }, type: 'customNode' },
  { id: '20', position: { x: CENTER_X, y: 1000 }, data: { label: 'Deposits', color: '#ffffff' }, type: 'customNode' },
  { id: '21', position: { x: CENTER_X + 2 * OFFSET_X, y: 1100 }, data: { label: 'Unclaimed Refunds for Retired Pools', color: '#AF6B66' }, type: 'customNode' },
  { id: '22', position: { x: CENTER_X + 4 * OFFSET_X, y: 1200 }, data: { label: 'Treasury', color: '#4DBDC7' }, type: 'customNode' },
  { id: '23', position: { x: CENTER_X + 4 * OFFSET_X, y: 1300 }, data: { label: 'Payouts', color: '#F0A724' }, type: 'customNode' },
  { id: '24', position: { x: CENTER_X + 3 * OFFSET_X, y: 700 }, data: { label: 'Rewards Going to Deregistered Stake Addresses', color: '#AF6B66' }, type: 'customNode' },
  { id: '25', position: { x: CENTER_X + 6 * OFFSET_X, y: 800 }, data: { label: 'Treasury Growth Rate', color: '#AF6B66' }, type: 'customNode' },
];

const initialEdges = [
  { id: 'e1-3', source: '1', target: '3', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e3-4', source: '3', target: '4', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e2-4', source: '2', target: '4', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e4-6', source: '4', target: '6', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e6-7', source: '6', target: '7', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e7-5', source: '7', target: '5', sourceHandle: 'top', targetHandle: 'bottom', animated: true, style: { stroke: 'black' } },
  { id: 'e5-1', source: '5', target: '1', sourceHandle: 'top', targetHandle: 'bottom', animated: true, style: { stroke: 'black' } },
  { id: 'e7-10', source: '7', target: '10', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e10-13', source: '10', target: '13', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e13-15', source: '13', target: '15', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e13-14', source: '13', target: '14', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e15-17', source: '15', target: '17', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e14-16', source: '14', target: '16', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e19-17', source: '19', target: '17', sourceHandle: 'top', targetHandle: 'bottom', animated: true, style: { stroke: 'black' } },
  { id: 'e18-16', source: '18', target: '16', sourceHandle: 'top', targetHandle: 'bottom', animated: true, style: { stroke: 'black' } },
  { id: 'e19-20', source: '19', target: '20', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e18-20', source: '18', target: '20', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e20-21', source: '20', target: '21', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e21-22', source: '21', target: '22', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e22-23', source: '22', target: '23', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e4-25', source: '4', target: '25', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e25-22', source: '25', target: '22', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e7-24', source: '7', target: '24', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
  { id: 'e24-22', source: '24', target: '22', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: 'black' } },
];

const nodeDescriptions = {
  'ADA Reserves': {
    definition: 'The total amount of ADA held in reserves for staking rewards.',
    description: 'These reserves are used to distribute rewards to participants in the staking process.'
  },
  'Total Transaction Fees': {
    definition: 'The sum of all transaction fees collected during the epoch.',
    description: 'Transaction fees are accumulated over each epoch and contribute to the total reward pot.'
  },
  'Monetary Expansion Rate * Performance of All Stake Pools': {
    definition: 'The monetary expansion rate multiplied by the performance of all stake pools.',
    description: 'This value reflects the overall performance and growth of the staking network.'
  },
  'Total Reward Pot': {
    definition: 'The total amount of ADA available for distribution as rewards in an epoch.',
    description: 'This pot is divided among all eligible participants based on their contributions and performance.'
  },
  'Unclaimed Rewards': {
    definition: 'Rewards that have been generated but not yet claimed by any stakeholders.',
    description: 'Unclaimed rewards remain in the system and can be claimed by stakeholders at a later date.'
  },
  '1 - Treasury Growth Rate': {
    definition: 'The remaining percentage of rewards after the treasury growth rate has been deducted.',
    description: 'This represents the portion of rewards available for distribution after allocating funds to the treasury.'
  },
  'Stake Pool Rewards Pot': {
    definition: 'The total rewards allocated to all stake pools in an epoch.',
    description: 'Stake pools receive a portion of the total rewards based on their performance and contributions.'
  },
  'Rewards Equation for Pool n': {
    definition: 'The formula used to calculate rewards for a specific stake pool.',
    description: 'This equation takes into account various factors such as performance, stake, and pool parameters.'
  },
  'Stake Pool n': {
    definition: 'A specific stake pool participating in the staking process.',
    description: 'Stake pools are entities that aggregate stakes from multiple stakeholders and participate in block production.'
  },
  'Margin & Minimum Pool Cost': {
    definition: 'The margin and minimum cost associated with running a stake pool.',
    description: 'These factors determine the profitability and operational costs of a stake pool.'
  },
  'Rewards': {
    definition: 'The rewards distributed to delegators and pool operators.',
    description: 'Rewards are earned based on the amount of stake delegated and the performance of the stake pool.'
  },
  'Operators': {
    definition: 'The individuals or entities responsible for running stake pools.',
    description: 'Operators manage the infrastructure and ensure the pool remains competitive and performs well.'
  },
  'Delegators': {
    definition: 'Individuals who delegate their ADA to stake pools to earn rewards.',
    description: 'Delegators contribute to the staking process by providing their ADA to pools in exchange for a share of the rewards.'
  },
  'Stake Pool Registrations & Deregistrations': {
    definition: 'The process of registering and deregistering stake pools.',
    description: 'Stake pools must be registered to participate in the staking process and can be deregistered if they no longer wish to participate.'
  },
  'Stake Key Registrations & Deregistrations': {
    definition: 'The process of registering and deregistering stake keys.',
    description: 'Stake keys are necessary for participating in staking and must be registered to be recognized by the network.'
  },
  'Deposits': {
    definition: 'The deposits made for registering stake pools and keys.',
    description: 'Deposits are required to register and maintain stake pools and stake keys within the network.'
  },
  'Unclaimed Refunds for Retired Pools': {
    definition: 'Refunds that have not been claimed by retired stake pools.',
    description: 'These refunds are available to stake pools that have been retired from active participation.'
  },
  'Treasury': {
    definition: 'The treasury where a portion of the rewards is allocated for funding community projects.',
    description: 'The treasury supports the growth and development of the Cardano ecosystem through various initiatives.'
  },
  'Payouts': {
    definition: 'Payouts made from the treasury for community projects.',
    description: 'These payouts support projects such as Project Catalyst, which funds innovative proposals in the Cardano ecosystem.'
  },
  'Rewards Going to Deregistered Stake Addresses': {
    definition: 'Rewards allocated to stake addresses that have been deregistered.',
    description: 'These rewards are distributed to addresses that were previously registered but have since been deregistered.'
  },
  'Treasury Growth Rate': {
    definition: 'The rate at which the treasury grows from the total rewards.',
    description: 'This growth rate determines the portion of rewards allocated to the treasury for future use.'
  },
};

const Diagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef(null);
  const { fitView, zoomOut } = useReactFlow();

  useEffect(() => {
    if (reactFlowWrapper.current) {
      fitView();
      zoomOut();
      zoomOut(); // Zoom out twice
    }
  }, [fitView, zoomOut]);

  const handleElementClick = (event, node) => {
    setSelectedNode(node);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNode(null);
  };

  return (
    <div ref={reactFlowWrapper} style={{ height: '100%', width: '100%' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleElementClick}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedNode?.data?.label}</DialogTitle>
        <DialogContent>
          <Typography>
            {nodeDescriptions[selectedNode?.data?.label]?.definition}
          </Typography>
          <Typography paragraph>
            {nodeDescriptions[selectedNode?.data?.label]?.description}
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
