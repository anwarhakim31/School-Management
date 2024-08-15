// utils/formatDate.js
export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatIndonesiaDate = (tanggal) => {
  return tanggal.toLocaleDateString(`id-ID`, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
