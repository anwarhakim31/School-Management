import mongoose from "mongoose";

const liburSchema = new mongoose.Schema({
  perpekan: [
    {
      hari: {
        type: String,
        enum: ["Sabtu", "Minggu"],
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  ],
  nasional: [
    {
      tanggal: {
        type: Date,
        required: true,
      },
      keterangan: {
        type: String,
        required: true,
      },
    },
  ],
});

const Libur = mongoose.model("Libur", liburSchema);

export default Libur;
