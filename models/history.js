import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
    
    videoId:{
         type:String,
         watchedAt: { type: Date, default: Date.now, expires: '3d' },
         required:true,   
     },
     userId:{
        type:String,
         watchedAt: { type: Date, default: Date.now, expires: '3d' },
         required:true,
     }
      
 },
 {timestamps:true}
 );
 
 export default mongoose.model("HISTORY" ,HistorySchema)