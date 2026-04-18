import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  image:{type:String,default:''}
});
export const Movie = mongoose.model("Movie", movieSchema);
