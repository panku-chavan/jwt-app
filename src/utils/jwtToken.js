import jwt from "jsonwebtoken";

const generatedToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"5d",});
};

export default generatedToken;