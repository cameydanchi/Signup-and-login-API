import { Router } from "express";
import { registerUser, userLogin } from "../controllers/controller.js";


export  const router = Router();

router.post('/signup',registerUser);
router.post('/login',userLogin)