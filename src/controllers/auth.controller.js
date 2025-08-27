import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const registerController = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(401, errors.array()[0].msg)
    }

    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existingUser) {
        throw new ApiError(403, "Username or email already exists")
    }

    const user = await User.create({
        username,
        email,
        password,
        refreshToken: "",
        role: "customer"
    })

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res.cookie("accessToken", accessToken)
    res.cookie("refreshToken", refreshToken)

    return res.json(new ApiResponse(200, user))
})

export const loginController = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(401, errors.array()[0].msg)
    }
    const { email, password } = req.body;
    const user = await User.findOne({
        email
    })
    if (!user) {
        throw new ApiError(400, "user doesn't exist")
    }
    const isPassWordValid = user.validatePassword(password)
    if (!isPassWordValid) {
        throw new ApiError(401, "please enter a valid password")
    }
    const token = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res.cookie("accessToken", token)
    res.cookie("refreshToken", refreshToken)
    return res.json(new ApiResponse(200, "Logged in successfully"))
})

export const refreshTokenController = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new ApiError(401, "Refresh token not found, login again")
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    if (!decoded) {
        throw new ApiError(403, "Invalid refresh token")
    }

    const user = await User.findOne({ username: decoded.username })
    if (!user) {
        throw new ApiError(403, "Unauthorized")
    }

    if (user.refreshToken != refreshToken) {
        throw new ApiError(403, "Unauthorized")
    }

    const token = user.generateAccessToken();
    const newrefreshToken = await user.generateRefreshToken();
    res.cookie("accessToken", token)
    res.cookie("refreshToken", newrefreshToken)
    res.json(new ApiResponse(200, "New token generated"))
})