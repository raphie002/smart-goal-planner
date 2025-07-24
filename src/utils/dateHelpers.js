export const getDaysLeft = (deadline) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to start of day
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0); // Normalize deadline to start of day

  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const isDeadlineApproaching = (deadline, savedAmount, targetAmount) => {
  if (savedAmount >= targetAmount) {
    return false; // Goal completed, no warning needed
  }
  const daysLeft = getDaysLeft(deadline);
  return daysLeft > 0 && daysLeft <= 30;
};

export const isOverdue = (deadline, savedAmount, targetAmount) => {
  if (savedAmount >= targetAmount) {
    return false; // Goal completed, not overdue
  }
  const daysLeft = getDaysLeft(deadline);
  return daysLeft < 0; // Deadline has passed
};