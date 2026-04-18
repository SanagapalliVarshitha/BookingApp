import express from "express";
import { Show } from "../models/show.model";
import { generateSeats } from "../utils/generateSeats";
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { movieId, time, theaterName } = req.body;
    const show = await Show.create({ movieId, time, theaterName, seats: generateSeats() });
    res.json(show);
  } catch (err) { res.status(500).json({ error: "Failed to create show" }); }
});
router.get("/", async (req, res) => {
  const shows = await Show.find().populate("movieId");
  res.json(shows);
});
export default router;
