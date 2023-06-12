import express from 'express';
import { adminSignin } from '../../controllers/adminController/adminAuth.js';


const router = express.Router();


router.post("/adminSignIn" , adminSignin) 

export default router;