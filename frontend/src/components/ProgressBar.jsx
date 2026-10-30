import React from 'react';

const ProgressBar = ({ percent = 0, showLabel = true, height = 8 }) => {
  const safePercent = Math.min(100, Math.max(0, percent || 0));
  const isComplete = safePercent >= 100;

  return (
    <div className="progress-container">
      {showLabel && (
        <div className="progress-header">
          <span>Course Progress</span>
          <span style={{ color: isComplete ? 'var(--success)' : 'var(--primary)' }}>
            {safePercent}%
          </span>
        </div>
      )}
      <div className="progress-track" style={{ height: `${height}px` }}>
        <div
          className={`progress-fill ${isComplete ? 'completed' : ''}`}
          style={{ width: `${safePercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
