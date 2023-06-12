import { createError } from "../../error.js"
import Live from "../../models/Live.js"
import User from "../../models/Users.js"
import Video from "../../models/Video.js"
import bcrypt from "bcrypt"



export const update = async(req,res,next)=>{
    
    if(req.params.id === req.user.id){
        
        
try{
    const salt = bcrypt.genSaltSync(10);
    
     const hash = bcrypt.hashSync(req.body.password,salt)  
   const updatedUser = await User.findByIdAndUpdate(req.params.id,{
    $set:{...req.body,password:hash}
   },{
    new:true
   }
   )
   
res.status(200).json(updatedUser)
}catch(err){
    next(err)
}
    }else{
        return next(createError(403,"You can only Update your account"))
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
          await User.findByIdAndDelete(req.params.id)
           res.status(200).json("User has been Deleted")

        }catch(err){
         next(err)
        }
    }
    else{
        return next(createError(403,"You Can only delete your account"))
    }
    
}
export const getUser = async(req,res,next)=>{
    try{
       
     const user = await User.findById(req.params.id)
  
     res.status(200).json(user)
    }catch(err){
        next(err)
    }
}
export const subscribeUser = async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,
        {$push:{subscribedUsers:req.params.id}
    })
    await User.findByIdAndUpdate(req.params.id,{
       $inc:{subscribers:1} 
    })
    res.status(200).json("Subscription Succesfull")
    }
    catch(err){
        next(err)
    }
    
}
export const unsubscribeUser = async(req,res,next)=>{
    try{
       
     await User.findByIdAndUpdate(req.user.id ,{
        $pull:{subscribedUsers:req.params.id}
     })
     await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:-1}
     })
     res.status(200).json("Unsubscription Succeful")
    }catch(err){
        next(err)
    }
}
export const likeVideo = async(req,res,next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId
    const name = req.body.userName
    
    try{
    const video =  await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{disLikes:id}
     })
     const user = video.userId;
     await User.findByIdAndUpdate(user, {
       $addToSet: {
         notifications: {
           message: `Your video is liked by ${name}`,
           timestamp: new Date()
         }
       }
     });
     
     res.status(200).json("The video has been Liked")
    }catch(err){
        next(err)
    }
}
export const dislikeVideo = async(req,res,next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{disLikes:id},
            $pull:{likes:id}
         })
         res.status(200).json("The video has been Disliked")
    }catch(err){
        next(err)
    }
}

export const usersList  = async(req,res,next)=>{
    try{
        const users = await User.find({ isAdmin: { $ne: true } });
   
      res.status(200).json(users)
    }catch(err){
      next(err)
    }
}

export const reportUser = async(req,res,next)=>{
    
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{$inc:{
        report:1
        }},{new:true} )
 if(!user){
    return res.status(404).json({ message: 'User not found' });
 }
 else{
    res.status(200).json({ message: 'Report count increased successfully' });
 }

    }catch(err){
        next(err)
    }
}

export const suspendUser =async(req,res,next)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id ,{$set:{
            suspended : true,
            suspensionEndDate : Date.now() + 7 * 24 * 60 * 60 * 1000
        }})
       
        if(user){
            res.status(200).json({ message: 'User suspended successfully' });
        }
         
    }catch(err){

    }
}

export const notification = async(req,res,next)=>{
    
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const notifications = user.notifications;
    
        res.status(200).json(notifications);
      } catch (err) {
        next(err);
      }
    };


    export const viewedNotification = async (req, res, next) => {
        const userId = req.user.id;
        console.log(userId, "ho");
        try {
          const notification = await User.updateOne(
            { _id: userId },
            { $set: { "notifications.$[].viewed": true } }
          );
          res.status(200).json({ success: true, message: "Notifications viewed successfully" });
        } catch (err) {
          next(err);
        }
      };

      export const joinLive = async (req,res,next) => {
        
        try{
            const {userId , roomId} = req.body;
            const existingLive = await Live.findOne({ userId });
            if(!existingLive){
                console.log("Ko");
                const newLive =  new Live({userId:userId,roomId:roomId})
                await newLive.save()
            }
            
        }catch(err){
            next(err);
        }
        
      }

      export const leaveRoom = async(req,res,next)=>{
        try{
           console.log(req.body);
        }catch(err){

        }
      }

      export const getLiveUser = async (req, res, next) => {
        try {
          console.log("hi");
          const liveData = await Live.find();
          res.status(200).json(liveData);
        } catch (err) {
          next(err);
        }
      }
      

    
      