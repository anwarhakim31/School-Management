import mongoose from "mongoose";

const kelasSchema = new mongoose.Schema({
  kelas: {
    type: Number,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  waliKelas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guru",
    required: false,
  },
  posisi: {
    type: String,
    required: false,
  },
  siswa: [{ type: mongoose.Schema.Types.ObjectId, ref: "Siswa" }],
  jumlahSiswa: {
    type: Number,
    default: 0,
  },
});

const Kelas = mongoose.model("Kelas", kelasSchema);

export default Kelas;
