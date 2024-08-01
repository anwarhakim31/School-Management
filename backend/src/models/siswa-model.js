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
  kelas: { type: mongoose.Schema.ObjectId, ref: "Kelas", required: true },
  ortu: {
    type: String,
    required: true,
  },
  mapel: [{ type: mongoose.Schema.ObjectId, ref: "Mapel", required: true }],
});

const Siswa = siswaSchema.model("siswa", siswaSchema);

export default Siswa;
