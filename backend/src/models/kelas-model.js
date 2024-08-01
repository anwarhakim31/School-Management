import mongoose from "mongoose";

const kelasSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  tingkat: {
    type: String,
    required: true,
  },
  waliKelas: {
    type: mongoose.Schema.ObjectId,
    ref: "Guru",
    required: false,
  },
  siswa: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Siswa",
      required: false,
    },
  ],
});

const Kelas = mongoose.model("Kelas", kelasSchema);

export default Kelas;
