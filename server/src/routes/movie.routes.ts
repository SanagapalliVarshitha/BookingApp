import express from 'express';
import {Movie} from "../models/movie.model";
const router=express.Router();
router.post("/",async(req,res)=>{
    try{ const movie=await Movie.create(req.body); res.json(movie); }
    catch{ res.status(500).json({message:"Failed to create movie"}); }
});
router.get("/",async(req,res)=>{
    try{ const movies=await Movie.find(); res.json(movies); }
    catch{ res.status(500).json({message:"Failed to fetch movies"}); }
});
export default router;
