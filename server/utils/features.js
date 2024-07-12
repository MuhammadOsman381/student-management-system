import jwt from "jsonwebtoken";

export const createToken = (user,res,message,status=200)  =>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    return token
}