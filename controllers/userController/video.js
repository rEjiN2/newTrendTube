import { createError } from "../../error.js"
import Video from "../../models/Video.js"
import User from "../../models/Users.js"

export const addVideo = async(req,res,next)=>{
  
  const newVideo= new Video({userId:req.user.id,...req.body})
  
  try{
     const savedVideo = await newVideo.save()
    
     res.status(200).json(savedVideo)
  }catch(err){
    
    next(err)
  }
}
export const updateVideo = async(req,res,next)=>{
    try{
const video = await Video.findById(req.params.id)
if(!video) return next(createError(404,"video not found"))
if(req.user.id === video.userId){
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{
        new:true
    })
    res.status(200).json(updatedVideo)
}
else{
    return next(createError(403,"You can update Only Your Videos"))
}
    }catch(err){
      next(err)
    } 
}
export const deleteVideo = async(req,res,next)=>{
    try{
  const video = await Video.findById(req.params.id)
  if(!video) return next(createError(404,"Video NOt found"))
  if(req.user.id === video.userId){
    await Video.findByIdAndDelete(req.params.id)
    res.status(200).json("Video deleted Succesfully")
  }
  else{
    return next(createError(403,"You can delete Only your Videos"))
  }
    }catch(err){
      next(err)
    }
}
export const getVideo = async(req,res,next)=>{
  try{
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
   
    if(!video){
      return res.status(200).json("sTAY tUNED fOR vIDEOS")
    } else {
      
      if (req.user) {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (user) {
          // Check if the user has already watched the video
          const alreadyWatched = user.watchHistory.some((watchedVideo) =>
            watchedVideo.video.equals(video._id)
          );

          if (!alreadyWatched) {
            // Add the video to the user's watch history
            user.watchHistory.push({ video: video._id, watchedAt: new Date() });
            await user.save();
          }
        }
      }
      return res.status(200).json(video);
    }
  } catch(err){
    next(err)
  }
}

export const addView = async(req,res,next)=>{
    try{
      
      const video = await Video.findByIdAndUpdate(req.params.id,{
        $inc:{views : 1 },
      })

      res.status(200).json("The view has been increased")
    }catch(err){
      next(err)
    }
}

export const randomVideos = async(req,res,next)=>{
    try{
      const videos =await Video.aggregate([{$sample:{size:40}}])
      if(!videos) return res.status(200).json("sTAY tUNED fOR vIDEOS")
      res.status(200).json(videos)
    }catch(err){
      next(err)
    }
}

export const subVideos = async(req,res,next)=>{
    try{
      
     const user = await User.findById(req.user.id)
     const subscribedChannels = user.subscribedUsers

     const list = await Promise.all(
        subscribedChannels.map(channelId=>{
            return Video.find({userId:channelId})
        })
     )
     res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt))
    }catch(err){
      next(err)
    }
}

export const trendVideos = async(req,res,next)=>{
    try{
      const videos = await Video.find().sort({views:-1})
      if(!videos) return res.status(200).json("sTAY tUNED fOR vIDEOS")
      res.status(200).json(videos)
    }catch(err){
      next(err)
    }
}

export const getByTags = async(req,res,next)=>{
  const tags = req.query.tags.split(",")
  try{
    const videos = await Video.find({ tags : { $in:tags } }).limit(20)
    if(!videos) return res.status(200).json("sTAY tUNED fOR vIDEOS")
    res.status(200).json(videos)
  }catch(err){
    next(err)
  }
}

export const search = async(req,res,next)=>{
  const query = req.query.query;
  
  try{
    const videos = await Video.find({title: {$regex:query , $options: "i"}}).limit(40)
    if(!videos) return res.status(200).json("sTAY tUNED fOR vIDEOS")
    res.status(200).json(videos)
  }catch(err){
    next(err)
  }
}
export const getUserWatchHistory = async(req,res,next)=>{
  try{
      const userId = req.user.id;
      const user = await User.findById(userId).populate({
          path: 'watchHistory.video',
          model: Video,
      });

      if(!user){
          return res.status(404).json({message: "User not found."})
      }

      const watchedVideos = user.watchHistory.map((watchedVideo) => watchedVideo.video);
      
      const historyVid = watchedVideos.sort((a, b) => a.watchedAt - b.watchedAt).reverse();
    return res.status(200).json(historyVid);

  } catch(err){
      next(err)
  }
}

export const getVideos = async(req,res,next)=>{
       try{
        const videos = await Video.find({verified:{$eq:false}})
      
        res.status(200).json(videos)
       }catch(err){
     next(err)
       }
}
export const myVideos = async(req,res,next)=>{
  try{
    const videos= await Video.find({userId:{$eq : req.user.id}}).limit(20)
    if(!videos) return res.status(200).json("sTAY tUNED fOR vIDEOS")
    res.status(200).json(videos)
  }
  catch(err){
    next(err)
  }
}

export const reportVideo = async (req, res, next) => {
  try {
    
    const { reason } = req.body;

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { report: 1 },
        $push: { reportReasons: reason } 
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    } else {
      res.status(200).json({ message: 'Report count increased successfully' });
    }
  } catch (err) {
    next(err);
  }
};


export const videosList = async(req,res,next)=>{
  try{
     const videos =await Video.find();
     if(!videos){
      res.status(404).json({message:"videos not found"})
     }else{
      res.status(200).json(videos)
     }
  }catch(err){

  }
}