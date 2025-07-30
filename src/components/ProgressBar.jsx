import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${Math.min(progress, 100)}%` }}></div>
    </div>
  );
};

export default ProgressBar;