export const color = [
  "#4f46e5", // Biru gelap
  "#d1ea2c", // Merah
  "#faff00", // Kuning stabilo
  "#22c55e", // Hijau cerah
  "#a855f7", // Ungu
  "#ff6600", // Oranye stabilo
  "#ff00ff", // Cyan stabilo
  "#fb4651", // Hijau limau
  "#9333ea", // Ungu stabiloe53e3e
  "#1a57b3", // Biru medium
  "#00e5ff", // Hijau stabilo
  "#ec4899", // Pink terang
];

export const getColor = (number) => {
  if (number >= 0 && number < color.length) {
    return color[number];
  }

  return color[0];
};
