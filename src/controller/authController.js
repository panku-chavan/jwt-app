import User from "../models/authModel.js";
import bcrypt from 'bcryptjs';
import generatedToken from "../utils/jwtToken.js";

export const registerUser=async(req,res)=>{
  const {username, email,mobile, password}=req.body;
  try {
    const isUserExist=await User.findOne({email});
    if(isUserExist){
        res.status(401).json({
            messege:"User is already exist.",
            statusCode:401,
        })
    }else{
        const hashPassword= await bcrypt.hash(password,10);
        const user = await User.create({
            username:username,
            email:email,
            mobile:mobile,
            password:hashPassword
        });
        if(user){
            res.status(200).json({
                messege:"User Registered successfully.",
                statusCode:200,
                result:{
                    username:user.username,
                    email:user.email
                },
                token:generatedToken(user._id)
            });
        }else{
            res.status(401).json({
                messege:"Invalid User Data.",
                statusCode:401
            })
        }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
        messege:"Something went wrong.",
        statusCode:500,
        error:error
    })
  }
}

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            res.status(401).json({
                messege:"Invalid credentials.",
                statusCode:401
            })
        }else{
            const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            res.status(200).json({
                messege:"Login Successful!.",
                statusCode:200,
                result:{
                    username:user.username,
                    email:user.email,
                    mobile:user.mobile
                },
                token:generatedToken(user._id)
            })
        }else{
            res.status(401).json({
                messege:"Invalid Credentials.",
                statusCode:401
            })
        }
        }
        
    } catch (error) {
        res.status(500).json({
            messege:"Something went wrong!.",
            statusCode:500,
            error:error
        })
    }
}

export const deleteUser=async(req,res)=>{
    const id= req.params.id;
    try {
        const user=await User.findById(id);
        if(!user){
            res.status(404).json({
                messege:"User not found.",
                statusCode:404,
            })
        }else{
            await User.findByIdAndDelete(id)

        res.status(200).json({
            messege:"User Deleted successfully!.",
            statusCode:200
        })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            messege:"Something went wrong",
            statusCode:500,
            error:error
        })
    }
}

export const updateUser=async(req,res)=>{
    const id=req.params.id;
    const {username,email,mobile}=req.body;

    try {
        const user=await User.findById(id);
        if(!user){
            res.status(404).json({
                messege:"User not found.",
                statusCode:404
            })
        }else{
           const updatedUser= await User.findByIdAndUpdate(id,{
            username:username,
            email:email,
            mobile:mobile
           })
           res.status(200).json({
            messege:"User data updated successfully!.",
            statusCode:200,
            result:{
                username:username,
                email:email,
                mobile:mobile
            }
           })
        }
        
    } catch (error) {
        res.status(500).json({
            messege:"Something went wrong!.",
            statusCode:500,
            error:error
        })
    }
}

export const getUserList=async(req,res)=>{
    try {
        const allUsers=await User.find({});
       if(allUsers.length!==0){
        // console.log(allUsers)
        res.status(200).json({
            messege:"User data get successfully!.",
            statusCode:200,
            result:allUsers.map((user)=>{
                return {
                    id:user._id,
                    username:user.username,
                    email:user.email,
                    mobile:user.mobile
                }
            })
        })
       }else{
        res.status(401).json({
            messege:"No data found.",
            statusCode:401,
            
        })
       }
    } catch (error) {
        res.status(500).json({
            messege:"Something went wrong!.",
            statusCode:500,
            error:error
        })
    }
}

export const getUseDetails=async (req,res)=>{
    const id = req.params.id;
    try {
        const user=await User.findById(id);
        if(!user){
            res.status(400).json({
                messege:"User not found, or you given id is wrong.",
                statusCode:400
            })
        }else{
            res.status(200).json({
                messege:"User data fetch successful.",
                statusCode:200,
                result:{
                    id:user._id,
                    username:user.username,
                    email:user.email,
                    mobile:user.mobile
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            messege:"Somthing went wrong",
            statusCode:500,
            error:error
        })
    }
}