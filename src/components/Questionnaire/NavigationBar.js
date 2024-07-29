import React from 'react';
import PropTypes from 'prop-types';

const NavigationBar = ({ current, total, onNavigate, answers }) => {
  return (
    <div>
      <p>Navigation:</p>
      {[...Array(total).keys()].map((index) => (
        <button
          key={index}
          onClick={() => onNavigate(index + 1)}
          style={{ backgroundColor: current === index + 1 ? 'lightblue' : 'white' }}
        >
          {index + 1} {answers[index] !== null ? '(Beantwortet)' : ''}
        </button>
      ))}
    </div>
  );
};

NavigationBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default NavigationBar;
