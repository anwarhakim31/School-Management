import mongoose from "mongoose";

const absensiSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    default: Date.now,
  },
  siswa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Siswa",
    required: true,
  },
  kelas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kelas",
    required: true,
  },
  status: {
    type: String,
    enum: ["hadir", "sakit", "izin", "alpha"],
    required: true,
  },
  guru: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guru",
  },
});

const Absensi = mongoose.model("Absensi", absensiSchema);

export default Absensi;
