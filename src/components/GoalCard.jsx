import React from 'react';
import { calculateProgress, getTimeRemaining } from '../utils/helpers';
import ProgressBar from './ProgressBar';
import './GoalCard.css';

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const progress = calculateProgress(goal.savedAmount, goal.targetAmount);
  const remainingAmount = goal.targetAmount - goal.savedAmount;
  const { daysLeft, status } = getTimeRemaining(goal.deadline, goal.savedAmount, goal.targetAmount);

  let statusClass = '';
  let statusText = '';
  if (status === 'completed') {
    statusClass = 'goal-completed';
    statusText = 'Completed!';
  } else if (status === 'overdue') {
    statusClass = 'goal-overdue';
    statusText = 'Overdue!';
  } else if (status === 'warning') {
    statusClass = 'goal-warning';
    statusText = `Warning: ${daysLeft} days left!`;
  } else {
    statusText = `${daysLeft} days left`;
  }

  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: ${goal.targetAmount.toLocaleString()}</p>
      <p>Saved: ${goal.savedAmount.toLocaleString()}</p>
      <p>Remaining: ${remainingAmount.toLocaleString()}</p>

      <ProgressBar progress={progress} />

      <p className="progress-text">{progress.toFixed(2)}% Complete</p>
      <p className={`deadline ${statusClass}`}>Deadline: {goal.deadline} ({statusText})</p>

      <div className="card-actions">
        <button onClick={() => onEdit(goal)} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(goal.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default GoalCard;