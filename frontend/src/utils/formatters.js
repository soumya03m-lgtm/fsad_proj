export const toPercentage = (value, total) => (total ? `${Math.round((value / total) * 100)}%` : '0%');
