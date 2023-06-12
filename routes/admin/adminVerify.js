import express from 'express';
import { blockVideo, verifyVideo } from '../../controllers/adminController/adminVerify.js';


const router = express.Router();


router.put("/verifyVideo/:id" , verifyVideo)

router.put('/block/:id' , blockVideo)
export default router;