export const color = [
  "#4f46e5", // Deep Blue
  "#f56565", // Vivid Red
  "#facc15", // Bright Yellow
  "#34d399", // Bright Green
  "#c084fc", // Light Purple
  "#f97316", // Bright Orange
  "#0ea5e9", // Bright Cyan
  "#d1ea2c", // Vivid Lime
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#14b8a6", // Teal
  "#ec4899", // Pink
];

export const getColor = (number) => {
  if (number >= 0 && number < color.length) {
    return color[number];
  }

  return color[0];
};
