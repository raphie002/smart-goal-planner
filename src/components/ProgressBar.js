import React from 'react';
import './ProgressBar.css'; // Create this CSS file

const ProgressBar = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  const clampedPercentage = Math.min(100, Math.max(0, percentage)); // Ensure between 0 and 100

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${clampedPercentage}%` }}
      ></div>
      <span className="progress-bar-text">{Math.round(clampedPercentage)}%</span>
    </div>
  );
};

export default ProgressBar;