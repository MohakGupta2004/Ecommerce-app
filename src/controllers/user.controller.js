import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export const updateUserDetailsController = asyncHandler(async(req, res)=>{

})