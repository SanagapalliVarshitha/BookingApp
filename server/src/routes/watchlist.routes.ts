import express from "express";
import mongoose from "mongoose";
import { Watchlist } from "../models/watchlist.model";
import { authenticateToken, AuthRequest } from "../middleware/auth.middleware";
const router = express.Router();
router.get("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) { return res.status(401).json({ message: "Unauthorized" }); }
    const items = await Watchlist.find({ userId }).populate("movieId");
    res.json(items);
  } catch { res.status(500).json({ message: "Failed to fetch watchlist" }); }
});
router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) { return res.status(401).json({ message: "Unauthorized" }); }
    const { movieId } = req.body as { movieId?: string };
    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) { return res.status(400).json({ message: "Valid movieId is required" }); }
    const item = await Watchlist.create({ userId, movieId });
    res.status(201).json({ message: "Added to watchlist", item });
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && (err as {code:number}).code === 11000) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }
    res.status(500).json({ message: "Failed to add to watchlist" });
  }
});
router.delete("/:movieId", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) { return res.status(401).json({ message: "Unauthorized" }); }
    const movieId = req.params["movieId"] as string;
    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) { return res.status(400).json({ message: "Invalid movieId" }); }
    const result = await Watchlist.findOneAndDelete({ userId, movieId });
    if (!result) { return res.status(404).json({ message: "Not found in watchlist" }); }
    res.json({ message: "Removed from watchlist" });
  } catch { res.status(500).json({ message: "Failed to remove from watchlist" }); }
});
export default router;
