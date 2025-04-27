import mongoose, { Schema } from "mongoose";

const MeterReadingSchema = new Schema({
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  reading: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("MeterReading", MeterReadingSchema);
