export const calculateProgress = (saved, target) => {
  if (target === 0) return 0;
  return Math.min((saved / target) * 100, 100);
};

export const getTimeRemaining = (deadlineDateString, savedAmount, targetAmount) => {
  const today = new Date();
  // Set today's time to midnight for consistent day calculations
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(deadlineDateString);
  // Set deadline's time to midnight for consistent day calculations
  deadline.setHours(0, 0, 0, 0);

  const timeDiff = deadline.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  let status = 'on-track'; // Default

  if (savedAmount >= targetAmount) {
    status = 'completed';
  } else if (daysLeft < 0) { // Deadline has passed
    status = 'overdue';
  } else if (daysLeft <= 30) {
    status = 'warning';
  }

  return { daysLeft: Math.max(0, daysLeft), status };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};