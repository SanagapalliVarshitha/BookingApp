import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  userId: { type: String },
  showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show" },
  seats: [String],
  totalPrice: Number,
  status: { type: String, default: "confirmed" },
});
export const Booking = mongoose.model("Booking", bookingSchema);
