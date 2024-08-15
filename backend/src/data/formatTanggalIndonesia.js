export const formatTanggalIndonesia = (tanggal) => {
  return tanggal.toLocaleDateString("id-Id", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
