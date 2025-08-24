import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";


export const registerController = asyncHandler(async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new ApiError(401, errors.array()[0].msg)
    }

    const {username, email, password} = req.body;
    const existingUser = await User.findOne({
        $or : [{username}, {email}]
    })
    if(existingUser){
        throw new ApiError(403, "Username or email already exists")
    }

    const user = await User.create({
        username, email, password
    })

    return res.json(new ApiResponse(200, user))
})

export const loginController = asyncHandler(async(req, res)=>{
    return res.json("login")
})




    