import mongoose from "mongoose";

const guruSchema = new mongoose.Schema({
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
  bidangStudi: { type: String, required: true },
  waliKelas: { type: String, required: false, ref: "Kelas" },
  status: {
    type: String,
    enum: ["active", "non active"],
    default: "active",
    required: true,
  },
  alamat: { type: String, required: false },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Guru = mongoose.model("Guru", guruSchema);

export default Guru;
