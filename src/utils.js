export const formatTimestamp = seconds => (
  new Date(seconds * 1000)
    .toISOString()
    .substr(seconds > 3600 ? 11 : 14, seconds > 3600 ? 8 : 5)
);
