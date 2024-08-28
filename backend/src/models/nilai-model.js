import mongoose from "mongoose";

const nilaiSchema = new mongoose.Schema({
  siswa: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Siswa",
  },
  mataPelajaran: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Mapel",
  },
  kategori: {
    type: String,
    required: true,
    enum: ["ujian", "tugas"],
  },
  nilai: {
    type: Number,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  tahunAjaran: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Nilai = mongoose.model("Nilai", nilaiSchema);

export default Nilai;
