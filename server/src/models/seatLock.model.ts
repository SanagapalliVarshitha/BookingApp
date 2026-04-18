import mongoose from "mongoose";
const seatLockSchema = new mongoose.Schema({
  showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show" },
  seatNumber: String,
  lockedBy: String,
  expiresAt: Date,
});
seatLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const SeatLock = mongoose.model("SeatLock", seatLockSchema);
