import mongoose from "mongoose";

const useSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:Number,required:true},
    password:{type:String,required:true},
});
const User = mongoose.model('User',useSchema);

export default User;