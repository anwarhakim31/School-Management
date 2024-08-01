import mongoose from "mongoose";

const mapelSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  kode: {
    type: String,
    unique: true,
    required: true,
  },
  deskripsi: {
    type: String,
    required: false,
  },
  guru: {
    type: mongoose.Schema.ObjectId,
    ref: "Guru",
    required: false,
  },
});

const Mapel = mongoose.model("Mapel", mapelSchema);

export default Mapel;
