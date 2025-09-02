import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

export const isSeller=asyncHandler(async(req,res,next)=>{
    const accessToken=req.cookies.accessToken
    if(!accessToken){
        throw new ApiError(401,"not authorized")
    }
    const decoded=jwt.verify(accessToken,process.env.JWT_SECRET)
    if(!decoded){
        throw new ApiError(401,"not authorized")
    }
    const existingUser=await User.findOne({
        username:decoded.username
    })
    console.log(existingUser)
    if(existingUser.role != 'admin' && existingUser.role != 'seller'){
        throw new ApiError(401,"not authorized")
    }
    req.userId=existingUser._id
    next()
})