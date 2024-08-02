import mongoose from "mongoose";

const kelasSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  kelas: {
    type: Number,
    required: true,
  },
  waliKelas: {
    type: mongoose.Schema.ObjectId,
    ref: "Guru",
    required: false,
  },
  posisi: {
    type: String,
    required: false,
  },
  siswa: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Siswa",
      required: false,
    },
  ],
  jumlahSiswa: {
    type: Number,
    default: 0,
  },
});

const Kelas = mongoose.model("Kelas", kelasSchema);

export default Kelas;
