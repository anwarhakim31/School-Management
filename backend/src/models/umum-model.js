import mongoose from "mongoose";

const UmumSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
    default: "07:00",
  },
  endTime: {
    type: String,
    required: true,
    default: "15:00",
  },
  semester: {
    type: String,
    enum: ["ganjil", "genap"],
    default: "ganjil",
    required: true,
  },
  tahunAjaran: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TahunAjaran",
    required: true,
  },
});

const Umum = mongoose.model("umum", UmumSchema);

export default Umum;
