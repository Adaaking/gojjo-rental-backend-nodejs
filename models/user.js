import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type:String, required:true
    },
    email: {
        type:String,required:true
    },
    password: { type: String, required:true},
    createdAt:{
        type:Date,
        default: Date.now()
    },
    profilePicture:{
        type:String,
        default:null
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    id: {type: String}
})

export default mongoose.model("User",userSchema)