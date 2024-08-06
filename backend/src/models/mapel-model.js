import mongoose from "mongoose";

const mapelSchema = new mongoose.Schema({
  kode: {
    type: String,
    unique: true,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
});

const Mapel = mongoose.model("Mapel", mapelSchema);

export default Mapel;
