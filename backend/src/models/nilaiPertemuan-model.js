import mongoose from "mongoose";

const nilaiPertemuanSchema = new mongoose.Schema({
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
  kelas: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Kelas",
  },
  pertemuan: {
    type: "String",
    required: true,
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

const NilaiPertemuan = mongoose.model("NilaiPertemuan", nilaiPertemuanSchema);

export default NilaiPertemuan;
