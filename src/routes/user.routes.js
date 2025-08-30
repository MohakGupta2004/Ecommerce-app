import { Router } from "express";
import {isAdmin} from "../middleware/admin.middleware.js";
import {isLoggedIn} from "../middleware/isloggedin.middleware.js"
import { getUsersByIdController, getUsersController } from "../controllers/user.controller.js";
import { param } from "express-validator";


const router = Router()


router.route("/all").get(isAdmin, getUsersController)
router.route("/:id").get(isLoggedIn, 
    getUsersByIdController)


export default router