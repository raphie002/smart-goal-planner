import React, { useState } from 'react';
import './DepositForm.css'; // Create this CSS file

const DepositForm = ({ goals, onSubmit, selectedGoalId: propSelectedGoalId, onCancel }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState(propSelectedGoalId || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedGoalId) {
      setError('Please select a goal.');
      return;
    }
    if (parseFloat(depositAmount) <= 0 || isNaN(parseFloat(depositAmount))) {
      setError('Deposit amount must be a positive number.');
      return;
    }

    onSubmit(selectedGoalId, parseFloat(depositAmount));
    setDepositAmount(''); // Clear amount after submission
    setSelectedGoalId(''); // Clear selected goal after submission
  };

  return (
    <div className="deposit-form-container">
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="selectGoal">Select Goal:</label>
          <select
            id="selectGoal"
            value={selectedGoalId}
            onChange={(e) => setSelectedGoalId(e.target.value)}
            required
          >
            <option value="">-- Select a Goal --</option>
            {goals
              .filter(goal => goal.savedAmount < goal.targetAmount) // Only show goals not yet completed
              .map(goal => (
                <option key={goal.id} value={goal.id}>
                  {goal.name} (Remaining: ${goal.targetAmount - goal.savedAmount})
                </option>
            ))}
          </select>
          {error && selectedGoalId === '' && <p className="error-message">{error}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="depositAmount">Deposit Amount:</label>
          <input
            type="number"
            id="depositAmount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
          {error && depositAmount === '' && <p className="error-message">{error}</p>}
        </div>
        {error && depositAmount !== '' && selectedGoalId !== '' && <p className="error-message">{error}</p>}


        <div className="form-actions">
          <button type="submit">Deposit Funds</button>
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepositForm;