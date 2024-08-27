import mongoose from "mongoose";

const nilaiSchema = new mongoose.Schema({
  siswa: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Siswa",
  },
  mataPelajaran: {
    type: mongoose.Schema.ObjectId,
    required: false,
    ref: "Mapel",
  },
  kategori: {
    type: String,
    required: true,
  },
  nilai: {
    type: String,
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
});

const Nilai = mongoose.model("Nilai", nilaiSchema);

export default Nilai;
