import { Router } from "express"
import {login,signUp,getId} from "../controllers/auth.controller.js"
import { validateToken } from "../middleware/auth.js"


const router = Router()

router.post('/signup',signUp)
router.post('/login',login)
router.get('/',validateToken,getId)

export default router

