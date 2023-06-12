import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,    
    },
    isAdmin: {
     type:Boolean,
     default:false,
    },
    image:{
        type:String 
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUsers:{
        type:[String],
        default:0
    },
    fromGoogle:{
        type: Boolean,
        default:false
    },
    report:{
      type:Number,
      default:0
    },
    watchHistory: [{
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VIDEO'
        },
        watchedAt: {
            type: Date,
            default: Date.now(),
            expires: 259200, 
        }
    }],
    suspended: {
        type: Boolean,
        default: false,
    },
    suspensionEndDate: {
        type: Date,
        default: null,
    },
    online:{
        type:Boolean,
        default:false
    },
    notifications: [
      {
        message: {
          type: String,
          
        },
        viewed:{
            type:Boolean,
            default:false
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ]
},
{timestamps:true}
);

export default mongoose.model("USER" , UserSchema)