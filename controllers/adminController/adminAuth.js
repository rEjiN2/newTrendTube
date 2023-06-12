import User from "../../models/Users.js"
import bcrypt from "bcrypt";

import { createError } from "../../error.js"
import jwt from "jsonwebtoken"


export const adminSignin = async(req,res,next)=>{
  
    try {
    
        const admin = await User.findOne({ email: req.body.email });
        const isCorrect = await bcrypt.compare(req.body.password, admin.password);
        if (!isCorrect) {
          return next(createError(400, "Password doesn't Match"));
        }
        if(admin.isAdmin){
            const token = jwt.sign({ id: admin._id }, process.env.JWT);
             console.log(token,"token")
        const { password, ...others } = admin._doc;
        res
          .cookie(
            "adminAccess_token",
            token,
            {
              maxAge:1000* 60 * 60 * 1000,
              httpOnly: false,
              sameSite: 'none',
              secure: true 
            }
          )
          .status(200)
          .json(others);
        }else{
            return next(createError(400, "You are not an admin"));
        }
       
      } catch (err) {
        next(err);
      }
}