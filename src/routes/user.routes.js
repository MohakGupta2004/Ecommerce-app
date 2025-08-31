import { Router } from "express";
import {isAdmin} from "../middleware/admin.middleware.js";
import {isLoggedIn} from "../middleware/isloggedin.middleware.js"
import { getUsersByIdController, getUsersController, updatePasswordController } from "../controllers/user.controller.js";
import { body, param } from "express-validator";


const router = Router()


router.route("/all").get(isAdmin, getUsersController)
router.route("/:id").get(isLoggedIn, 
    getUsersByIdController)
router.route("/").put(
    body("currentPassword").isString(),
    body("newPassword").isString(), 
    isLoggedIn, updatePasswordController)

export default router