import mongoose from "mongoose";

const siswaSchema = new mongoose.Schema({
  nis: {
    type: Number,
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
  tanggalLahir: {
    type: String,
    required: true,
  },
  jenisKelamin: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  tahunMasuk: {
    type: String,
    required: true,
  },
  kontak: [
    {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: false,
      },
    },
  ],
  ortu: {
    type: String,
    required: true,
  },
  mapel: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Mapel", required: false },
  ],
  kelas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kelas",
    required: false,
  },
});

const Siswa = mongoose.model("siswa", siswaSchema);

export default Siswa;
