export const getRelativeTime = (createdAt, updatedAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  let timeText = '';

  if (diffSecs < 60) {
    timeText = diffSecs === 0 ? 'just now' : `${diffSecs} seconds ago`;
  } else if (diffMins < 60) {
    timeText = diffMins === 1 ? '1 minute ago' : `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    timeText = diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffDays < 7) {
    timeText = diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffDays < 30) {
    timeText = diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
  } else if (diffDays < 365) {
    timeText = diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
  } else {
    timeText = diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
  }

  // Check if post is edited
  const isEdited = updatedAt && new Date(updatedAt).getTime() !== created.getTime();
  const editedText = isEdited ? ' (edited)' : '';

  return timeText + editedText;
};
