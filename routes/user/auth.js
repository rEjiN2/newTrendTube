import express from 'express';
import {  } from '../../controllers/userController/video.js';
import { google, logout, signIn, signUp } from '../../controllers/userController/auth.js';

const router = express.Router();

// Create a User
router.post("/signUp", signUp)



//SignIn
router.post("/signIn",signIn)



//Google Authentication
router.post("/googleAuth",google)


router.get("/logout" ,logout )



export default router;