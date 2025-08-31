import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt'
export const getUsersController = asyncHandler(async (req, res) => {
    const users = await User.find();
    return res.json(new ApiResponse(200, users));
})

export const getUsersByIdController = asyncHandler(async(req, res)=>{
    const { id } = req.params;

    if(!id){
        return res.json(new ApiResponse(403, "Undefined params"));
    }

    const userDetails = await User.findById({_id: id})
    
    if(!userDetails){
        return res.json(new ApiResponse(404, "No user found"));
    }


    return res.json(new ApiResponse(200, userDetails));
})

export const updatePasswordController = asyncHandler(async(req, res)=>{
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        throw new ApiError(errors.array()[0].msg)
    }

    const {currentPassword, newPassword} = req.body;
    console.log(currentPassword)
    const userDetails = await User.findById({
        _id: req.userId
    })

    const currentPasswordHash = await bcrypt.hash(currentPassword, 10);
    const validate = userDetails.validatePassword(currentPasswordHash)
    
    if(!validate){
        throw new ApiError("Invalid Password")
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    const result = await User.findByIdAndUpdate({
        _id: req.userId,
    }, {
        password: newPasswordHash
    }
    )

    if(!result){
        throw new ApiError("Couldn't able to update password")
    }

    return res.json(new ApiResponse(200, "Password updated"))
})