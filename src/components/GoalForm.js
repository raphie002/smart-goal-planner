import React, { useState, useEffect } from 'react';
import './GoalForm.css'; // Create this CSS file

const GoalForm = ({ onSubmit, initialGoal = null, onCancel }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialGoal) {
      setName(initialGoal.name);
      setTargetAmount(initialGoal.targetAmount);
      setCategory(initialGoal.category);
      setDeadline(initialGoal.deadline);
    } else {
      // Reset form for new goal
      setName('');
      setTargetAmount('');
      setCategory('');
      setDeadline('');
    }
    setErrors({}); // Clear errors on initialGoal change
  }, [initialGoal]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Goal name is required.';
    if (parseFloat(targetAmount) <= 0 || isNaN(parseFloat(targetAmount))) newErrors.targetAmount = 'Target amount must be a positive number.';
    if (!category.trim()) newErrors.category = 'Category is required.';
    if (!deadline) newErrors.deadline = 'Deadline is required.';
    else {
        const today = new Date().toISOString().split('T')[0];
        if (deadline < today && !initialGoal) { // For new goals, deadline cannot be in the past
            newErrors.deadline = 'Deadline cannot be in the past.';
        }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const goalData = {
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline,
    };

    onSubmit(initialGoal ? { ...goalData, id: initialGoal.id } : goalData);
  };

  return (
    <div className="goal-form-container">
      <h2>{initialGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Goal Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount:</label>
          <input
            type="number"
            id="targetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
          {errors.targetAmount && <p className="error-message">{errors.targetAmount}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          {errors.category && <p className="error-message">{errors.category}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          {errors.deadline && <p className="error-message">{errors.deadline}</p>}
        </div>

        <div className="form-actions">
          <button type="submit">{initialGoal ? 'Update Goal' : 'Add Goal'}</button>
          {initialGoal && (
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GoalForm;