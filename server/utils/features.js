import jwt from "jsonwebtoken";

export const createToken = (user,res,message,status=200)  =>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)

    res.status(201).cookie("token",token,{
        httpOnly:true,
        maxAge:60*60*1000,
    }).json({
        success:true,
        message,
        response:user,
    })
}