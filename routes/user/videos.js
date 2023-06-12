import express from 'express';
import { addVideo, addView, deleteVideo,myVideos, getByTags, getUserWatchHistory, getVideo, getVideos, randomVideos, search, subVideos, trendVideos, updateVideo, reportVideo, videosList } from '../../controllers/userController/video.js';
import { verifyToken } from '../../verifyToken.js';

const router = express.Router();

// create a video
router.post("/",verifyToken,addVideo)

//update Video
router.put("/:id",verifyToken,updateVideo)

//delete video
router.delete("/:id",verifyToken,deleteVideo)

// get Video
router.get("/find/:id",getVideo)


router.put("/view/:id",addView)


router.get("/trend",trendVideos)

router.get("/myVid",verifyToken,myVideos)

router.get("/random",randomVideos)


router.get("/sub",verifyToken,subVideos)

router.get("/tags",getByTags)

router.get("/search",search)

router.get("/history" , getUserWatchHistory)

router.get("/getVid"  , getVideos)

router.put("/reportVid/:id" , reportVideo )

router.get("/videoList" ,videosList )


export default router;