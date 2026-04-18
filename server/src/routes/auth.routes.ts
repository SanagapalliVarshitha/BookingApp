import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
const router=express.Router();
router.post("/register",async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existing = await User.findOne({email});
        if(existing){ return res.status(400).json({message:"Email already in use"}); }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashedPassword,role});
        res.json({message:"User registered",userId:user._id});
    } catch { res.status(500).json({message:"Registration failed"}); }
});
router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){ return res.status(400).json({message:"Invalid email"}); }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){ return res.status(400).json({message:"Invalid password"}); }
        const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET||"secret",{expiresIn:"1h"});
        res.json({token});
    } catch { res.status(500).json({message:"Login failed"}); }
});
export default router;
