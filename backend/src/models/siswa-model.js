import mongoose from "mongoose";

const siswaSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "siswa",
  },
  nis: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  tempatLahir: {
    type: String,
    required: true,
  },
  tanggalLahir: {
    type: Date,
    required: true,
  },
  jenisKelamin: {
    type: String,
    enum: ["Laki-Laki", "Perempuan"],
    required: true,
  },
  agama: {
    type: String,
    required: true,
  },
  tahunMasuk: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  kelas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kelas",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Siswa = mongoose.model("Siswa", siswaSchema);

export default Siswa;
