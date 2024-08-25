import mongoose from "mongoose";

const guruSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "guru",
  },
  nip: { type: String, required: true, unique: true },
  nama: { type: String, required: true },
  password: { type: String, required: true },
  tempatLahir: { type: String, required: true },
  tanggalLahir: { type: Date, required: true },
  jenisKelamin: {
    type: String,
    enum: ["Laki-Laki", "Perempuan"],
    required: true,
  },
  phone: { type: String, required: true },
  bidangStudi: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Mapel",
  },
  waliKelas: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Kelas",
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
    required: true,
  },
  alamat: { type: String, required: false },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Guru = mongoose.model("Guru", guruSchema);

export default Guru;
