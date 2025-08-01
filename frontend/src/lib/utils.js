// utils/dateUtils.js

// Function to format date for display
export const formatDateLabel = (date) => {
  const today = new Date();
  const messageDate = new Date(date);
  
  // Reset time to compare only dates
  today.setHours(0, 0, 0, 0);
  messageDate.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - messageDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
  } else {
    return messageDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
};

// Function to check if we need to show date separator
export const shouldShowDateSeparator = (currentMessage, prevMessage) => {
  if (!prevMessage) return true;
  
  const currentDate = new Date(currentMessage.createdAt).toDateString();
  const prevDate = new Date(prevMessage.createdAt).toDateString();
  
  return currentDate !== prevDate;
};