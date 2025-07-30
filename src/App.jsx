import React, { useState, useEffect } from 'react';
import { fetchGoals, addGoal, updateGoal, deleteGoal } from './api/goalsApi';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import GoalCard from './components/GoalCard';
import Overview from './components/Overview';
import './App.css'; // Component-specific styles

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null); // State for editing a goal

  // --- Fetch Goals on Component Mount ---
  useEffect(() => {
    const getGoals = async () => {
      try {
        const data = await fetchGoals();
        setGoals(data);
      } catch (err) {
        setError('Failed to load goals. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getGoals();
  }, []); // Empty dependency array means this runs once on mount

  // --- CRUD Operations ---

  const handleAddGoal = async (newGoalData) => {
    try {
      // json-server will add an ID, but if we wanted client-side, we'd add it here
      const addedGoal = await addGoal({ ...newGoalData, createdAt: new Date().toISOString().split('T')[0] });
      setGoals((prevGoals) => [...prevGoals, addedGoal]);
      setEditingGoal(null); // Clear editing state after adding
    } catch (err) {
      setError('Failed to add goal.');
      console.error(err);
    }
  };

  const handleUpdateGoal = async (id, updatedData) => {
    try {
      const updated = await updateGoal(id, updatedData);
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal.id === id ? { ...goal, ...updated } : goal))
      );
      setEditingGoal(null); // Clear editing state after update
    } catch (err) {
      setError('Failed to update goal.');
      console.error(err);
    }
  };

  const handleDeleteGoal = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(id);
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
      } catch (err) {
        setError('Failed to delete goal.');
        console.error(err);
      }
    }
  };

  const handleMakeDeposit = async (goalId, depositAmount) => {
    const goalToUpdate = goals.find(goal => goal.id === goalId);
    if (!goalToUpdate) {
      setError('Goal not found for deposit.');
      return;
    }

    const newSavedAmount = goalToUpdate.savedAmount + depositAmount;

    try {
      // Use PATCH to update only the savedAmount field
      const updated = await updateGoal(goalId, { savedAmount: newSavedAmount });
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal.id === goalId ? { ...goal, savedAmount: updated.savedAmount } : goal))
      );
    } catch (err) {
      setError('Failed to make deposit.');
      console.error(err);
    }
  };

  const handleEditClick = (goal) => {
    setEditingGoal(goal);
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
  };

  if (loading) return <div className="loading-message">Loading goals...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="smart-goal-planner">
      <header>
        <h1>Smart Goal Planner</h1>
      </header>

      <main>
        <section className="form-section">
          <h2>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
          <GoalForm
            onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal}
            initialData={editingGoal}
            onCancelEdit={handleCancelEdit}
          />
        </section>

        <section className="form-section">
          <h2>Make a Deposit</h2>
          <DepositForm goals={goals} onMakeDeposit={handleMakeDeposit} />
        </section>

        <section className="overview-section">
          <Overview goals={goals} />
        </section>

        <section className="goals-list-section">
          <h2>Your Goals</h2>
          <div className="goals-container">
            {goals.length === 0 ? (
              <p>No goals added yet. Start by adding a new goal!</p>
            ) : (
              goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteGoal}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;