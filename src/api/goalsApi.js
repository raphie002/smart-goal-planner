const API_BASE_URL = 'http://localhost:3000/goals'; // Ensure this matches your json-server port

export const fetchGoals = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const addGoal = async (goalData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(goalData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const updateGoal = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH', // Use PATCH for partial updates, PUT for full replacement
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const deleteGoal = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // No content typically returned for DELETE, but check status
  if (response.status === 204) return; // No Content
  return response.json(); // Or handle other successful responses
};