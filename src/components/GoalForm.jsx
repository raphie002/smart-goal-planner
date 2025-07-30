import React, { useState, useEffect } from 'react';
import './GoalForm.css';

const GoalForm = ({ onSubmit, initialData = null, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
    savedAmount: 0, // Default for new goals
  });

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        targetAmount: initialData.targetAmount,
        category: initialData.category,
        deadline: initialData.deadline,
        savedAmount: initialData.savedAmount,
        id: initialData.id, // Keep ID for updates
      });
    } else {
      // Reset form for new goal
      setFormData({
        name: '',
        targetAmount: '',
        category: '',
        deadline: '',
        savedAmount: 0,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'targetAmount' || name === 'savedAmount' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount || !formData.category || !formData.deadline) {
      alert('Please fill in all required fields.');
      return;
    }
    if (formData.targetAmount <= 0) {
        alert('Target Amount must be a positive number.');
        return;
    }
    // If initialData exists, we're updating, otherwise adding
    onSubmit(formData.id, formData); // Pass ID for update, or null for add
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <div className="form-group">
        <label htmlFor="name">Goal Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="targetAmount">Target Amount:</label>
        <input
          type="number"
          id="targetAmount"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>
      {initialData && ( // Only show saved amount for existing goals being edited
        <div className="form-group">
          <label htmlFor="savedAmount">Saved Amount:</label>
          <input
            type="number"
            id="savedAmount"
            name="savedAmount"
            value={formData.savedAmount}
            onChange={handleChange}
            min="0"
          />
        </div>
      )}
      <button type="submit">{initialData ? 'Update Goal' : 'Add Goal'}</button>
      {initialData && <button type="button" onClick={onCancelEdit} className="cancel-btn">Cancel Edit</button>}
    </form>
  );
};

export default GoalForm;