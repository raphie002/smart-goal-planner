import React, { useState } from 'react';
import './DepositForm.css';

const DepositForm = ({ goals, onMakeDeposit }) => {
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGoalId || !depositAmount || Number(depositAmount) <= 0) {
      alert('Please select a goal and enter a valid positive deposit amount.');
      return;
    }
    onMakeDeposit(selectedGoalId, Number(depositAmount));
    setSelectedGoalId('');
    setDepositAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <div className="form-group">
        <label htmlFor="goalSelect">Select Goal:</label>
        <select
          id="goalSelect"
          value={selectedGoalId}
          onChange={(e) => setSelectedGoalId(e.target.value)}
          required
        >
          <option value="">-- Select a Goal --</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="depositAmount">Deposit Amount:</label>
        <input
          type="number"
          id="depositAmount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          required
          min="1"
        />
      </div>
      <button type="submit">Make Deposit</button>
    </form>
  );
};

export default DepositForm;