import mongoose from "mongoose";

const jadwalSchema = new mongoose.Schema({
  bidangStudi: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Mapel",
  },
  guru: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Guru",
  },
  kelas: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Kelas",
  },
  hari: {
    type: String,
    required: true,
  },
  mulai: {
    type: String,
    required: true,
  },
  selesai: {
    type: String,
    required: true,
  },
  jumlahPertemuan: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Jadwal = mongoose.model("Jadwal", jadwalSchema);

export default Jadwal;
