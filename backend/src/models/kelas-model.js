import mongoose from "mongoose";

// Define the schema
const kelasSchema = new mongoose.Schema({
  kelas: {
    type: Number,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  // waliKelas: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Guru",
  //   required: false,
  // },
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
