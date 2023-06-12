import Video from '../../models/Video.js'


export const verifyVideo = async(req,res,next)=>{
     
     const videoId = req.params.id;

     try{
      const video = await Video.findByIdAndUpdate(videoId,{$set:{verified:true,verifiedBy:req.user.id}})
      res.status(200).json("Video Verified")
     }catch(err){

     }
}

export const blockVideo = async(req,res,next)=>{
     const videoId = req.params.id;
  
          try{
   const video = await Video.findByIdAndUpdate(videoId,{$set:{blocked:true}})
   res.status(200).json(video)
   
     }catch(err){

     }
}