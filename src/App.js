import React, { useState, useEffect } from 'react';
import goalService from './services/goalService';
import GoalCard from './components/GoalCard';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import { isDeadlineApproaching, isOverdue } from './utils/dateHelpers';
import './App.css'; // Create this CSS file

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null); // Goal being edited
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [depositGoalId, setDepositGoalId] = useState(null); // Goal for deposit

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const data = await goalService.fetchGoals();
      setGoals(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch goals. Please ensure json-server is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (goalData) => {
    try {
      await goalService.addGoal(goalData);
      await fetchGoals(); // Re-fetch all goals to update the UI
      setShowAddGoalForm(false); // Hide form
    } catch (err) {
      setError("Failed to add goal.");
      console.error(err);
    }
  };

  const handleUpdateGoal = async (updatedGoal) => {
    try {
      await goalService.updateGoal(updatedGoal.id, updatedGoal);
      await fetchGoals(); // Re-fetch all goals
      setEditingGoal(null); // Clear editing state
    } catch (err) {
      setError("Failed to update goal.");
      console.error(err);
    }
  };

  const handleDeleteGoal = async (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await goalService.deleteGoal(id);
        await fetchGoals(); // Re-fetch all goals
      } catch (err) {
        setError("Failed to delete goal.");
        console.error(err);
      }
    }
  };

  const handleMakeDeposit = async (goalId, amount) => {
    try {
      await goalService.makeDeposit(goalId, amount);
      await fetchGoals(); // Re-fetch all goals
      setShowDepositForm(false); // Hide form
      setDepositGoalId(null);
    } catch (err) {
      setError("Failed to make deposit.");
      console.error(err);
    }
  };

  const totalGoals = goals.length;
  const totalMoneySaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const goalsCompleted = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Smart Goal Planner</h1>
      </header>

      {error && <div className="app-error-message">{error}</div>}

      <section className="overview-section">
        <h2>Overview</h2>
        <div className="overview-summary">
          <div className="summary-item">
            <strong>Total Goals:</strong> {totalGoals}
          </div>
          <div className="summary-item">
            <strong>Goals Completed:</strong> {goalsCompleted}
          </div>
          <div className="summary-item">
            <strong>Total Money Saved:</strong> ${totalMoneySaved.toLocaleString()}
          </div>
        </div>
      </section>

      <section className="forms-section">
        <div className="form-toggle-buttons">
          <button onClick={() => { setShowAddGoalForm(!showAddGoalForm); setEditingGoal(null); setShowDepositForm(false); }}>
            {showAddGoalForm ? 'Hide Add Goal Form' : 'Add New Goal'}
          </button>
          <button onClick={() => { setShowDepositForm(!showDepositForm); setShowAddGoalForm(false); setEditingGoal(null); }}>
            {showDepositForm ? 'Hide Deposit Form' : 'Make a Deposit'}
          </button>
        </div>

        {showAddGoalForm && !editingGoal && (
          <GoalForm onSubmit={handleAddGoal} onCancel={() => setShowAddGoalForm(false)} />
        )}
        {editingGoal && (
          <GoalForm initialGoal={editingGoal} onSubmit={handleUpdateGoal} onCancel={() => setEditingGoal(null)} />
        )}
        {showDepositForm && (
          <DepositForm
            goals={goals}
            onSubmit={handleMakeDeposit}
            selectedGoalId={depositGoalId}
            onCancel={() => { setShowDepositForm(false); setDepositGoalId(null); }}
          />
        )}
      </section>

      <section className="goals-list-section">
        <h2>My Savings Goals</h2>
        {loading ? (
          <p>Loading goals...</p>
        ) : goals.length === 0 ? (
          <p>No goals set yet. Start by adding a new goal!</p>
        ) : (
          <div className="goals-grid">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={(goalToEdit) => { setEditingGoal(goalToEdit); setShowAddGoalForm(true); setShowDepositForm(false); }}
                onDelete={handleDeleteGoal}
                onDeposit={(goalToDeposit) => { setDepositGoalId(goalToDeposit.id); setShowDepositForm(true); setShowAddGoalForm(false); }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;