import React from 'react';
import ProgressBar from './ProgressBar';
import { getDaysLeft, isDeadlineApproaching, isOverdue } from '../utils/dateHelpers';
import './GoalCard.css'; // Create this CSS file

const GoalCard = ({ goal, onEdit, onDelete, onDeposit }) => {
  const { id, name, targetAmount, savedAmount, category, deadline } = goal;
  const remainingAmount = targetAmount - savedAmount;
  const isComplete = savedAmount >= targetAmount;

  const daysLeft = getDaysLeft(deadline);
  const deadlineStatus = isComplete
    ? "Completed!"
    : isOverdue(deadline, savedAmount, targetAmount)
      ? "Overdue!"
      : isDeadlineApproaching(deadline, savedAmount, targetAmount)
        ? `Warning! ${daysLeft} days left`
        : `${daysLeft} days left`;

  const statusClass = isComplete
    ? 'status-completed'
    : isOverdue(deadline, savedAmount, targetAmount)
      ? 'status-overdue'
      : isDeadlineApproaching(deadline, savedAmount, targetAmount)
        ? 'status-warning'
        : '';

  return (
    <div className={`goal-card ${statusClass}`}>
      <h3>{name}</h3>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Target:</strong> ${targetAmount.toLocaleString()}</p>
      <p><strong>Saved:</strong> ${savedAmount.toLocaleString()}</p>
      <p><strong>Remaining:</strong> ${remainingAmount.toLocaleString()}</p>

      <ProgressBar current={savedAmount} total={targetAmount} />

      <p className="deadline-status">
        <strong>Deadline:</strong> {deadline} ({deadlineStatus})
      </p>

      <div className="goal-card-actions">
        <button onClick={() => onEdit(goal)}>Edit</button>
        <button className="delete-button" onClick={() => onDelete(id)}>Delete</button>
        {!isComplete && (
          <button className="deposit-button" onClick={() => onDeposit(goal)}>Make Deposit</button>
        )}
      </div>
    </div>
  );
};

export default GoalCard;