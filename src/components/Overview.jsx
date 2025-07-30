import React from 'react';
import { getTimeRemaining } from '../utils/helpers';
import './Overview.css';

const Overview = ({ goals }) => {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

  const getGoalStatusSummary = (goal) => {
    const { status } = getTimeRemaining(goal.deadline, goal.savedAmount, goal.targetAmount);
    return status;
  };

  const goalsByStatus = goals.reduce((acc, goal) => {
    const status = getGoalStatusSummary(goal);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="overview-summary">
      <h3>Overall Savings Snapshot</h3>
      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Total Money Saved:</strong> ${totalSaved.toLocaleString()}</p>
      <p><strong>Goals Completed:</strong> {completedGoals}</p>
      <p><strong>Goals On Track:</strong> {goalsByStatus['on-track'] || 0}</p>
      <p><strong>Goals with Warning (due soon):</strong> {goalsByStatus['warning'] || 0}</p>
      <p><strong>Goals Overdue:</strong> {goalsByStatus['overdue'] || 0}</p>
    </div>
  );
};

export default Overview;