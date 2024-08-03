import mongoose from "mongoose";

const siswaSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  jenisKelamin: {
    type: String,
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
  email: {
    type: String,
    required: false,
  },
  kelas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kelas",
    required: false,
  },
});

const Siswa = mongoose.model("Siswa", siswaSchema);

export default Siswa;
