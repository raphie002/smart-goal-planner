const API_URL = 'http://localhost:3000/goals';

const goalService = {
  async fetchGoals() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching goals:", error);
      return []; // Return empty array on error
    }
  },

  async addGoal(goal) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...goal,
          savedAmount: 0, // New goals start with 0 saved
          createdAt: new Date().toISOString().split('T')[0] // YYYY-MM-DD
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding goal:", error);
      throw error;
    }
  },

  async updateGoal(id, updatedFields) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating goal ${id}:`, error);
      throw error;
    }
  },

  async deleteGoal(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // No content returned for successful DELETE, just check status
      return true;
    } catch (error) {
      console.error(`Error deleting goal ${id}:`, error);
      throw error;
    }
  },

  async makeDeposit(goalId, amount) {
    try {
      // First, get the current goal to calculate the new savedAmount
      const goalResponse = await fetch(`${API_URL}/${goalId}`);
      if (!goalResponse.ok) {
        throw new Error(`HTTP error! status: ${goalResponse.status}`);
      }
      const goal = await goalResponse.json();

      const newSavedAmount = goal.savedAmount + parseFloat(amount);

      const response = await fetch(`${API_URL}/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savedAmount: newSavedAmount }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error making deposit to goal ${goalId}:`, error);
      throw error;
    }
  }
};

export default goalService;