import express from 'express';
import { deleteUser, dislikeVideo, notification,suspendUser, getUser,reportUser, likeVideo, subscribeUser, unsubscribeUser, update, usersList, viewedNotification, joinLive, leaveRoom, getLiveUser } from '../../controllers/userController/user.js';
import { verifyToken } from '../../verifyToken.js';

const router = express.Router();

// updateUser
router.put("/:id",verifyToken ,update)


//deleteUser
router.delete("/:id",verifyToken ,deleteUser)


// getUser

router.get("/find/:id" ,getUser)

//subscribeUser verifyToken
router.put("/sub/:id", verifyToken ,subscribeUser)



//unsubscribeUser

router.put("/unsub/:id",verifyToken ,unsubscribeUser)


//likeVideo

router.put("/like/:videoId",verifyToken ,likeVideo)


//dislikeVideo

router.put("/disLike/:videoId",verifyToken ,dislikeVideo)

router.get('/userList' , usersList)

router.put('/report/:id' , reportUser )

router.put('/suspend/:id' , suspendUser)

router.get('/notifications' , notification)

router.post('/notificationUpdate' ,viewedNotification)

router.post('/join' , joinLive)

router.post('/leave' ,leaveRoom)

router.get('/getLive' , getLiveUser)

export default router;