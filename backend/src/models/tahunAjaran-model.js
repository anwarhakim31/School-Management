import mongoose from "mongoose";

const TahunAjaranSchema = new mongoose.Schema({
  ajaran: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TahunAjaran = mongoose.model("TahunAjaran", TahunAjaranSchema);

export default TahunAjaran;
