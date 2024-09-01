export const color = [
  "#4f46e5", // Biru gelap
  "#d1ea2c", // Merah
  "#faff00", // Kuning stabilo
  "#22c55e", // Hijau cerah
  "#a855f7", // Ungu
  "#ff6600", // Oranye stabilo
  "#ff00ff", // Cyan stabilo
  "#e53e3e", // Hijau limau
  "#2eb88a", // Ungu stabiloe53e3e
  "#af57db", // Biru medium
  "#00e5ff", // Hijau stabilo
  "#ec4899", // Pink terang
];

export const getColor = (number) => {
  if (number >= 0 && number < color.length) {
    return color[number];
  }

  return color[0];
};
