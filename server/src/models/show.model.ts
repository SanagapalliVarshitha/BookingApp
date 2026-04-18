import mongoose from "mongoose";
const seatSchema=new mongoose.Schema({
    seatNumber:{type:String,required:true},
    isBooked:{type:Boolean,default:false}
})
const showSchema=new mongoose.Schema({
    movieId:{type:mongoose.Schema.Types.ObjectId,ref:"Movie",required:true},
    time:{type:String,required:true},
    theaterName:{type:String,required:true},
    seats:[seatSchema]
})
export const Show=mongoose.model("Show",showSchema);
