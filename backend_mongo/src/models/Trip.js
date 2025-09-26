import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  insights: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Trip", tripSchema);
