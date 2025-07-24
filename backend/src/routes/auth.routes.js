import express from "express";
import { login, logout, signUp,updateProfile, checkAuth } from "../controller/auth.controller.js";
import {protectRoute} from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',login);
router.post('/logout',logout);

router.put('/update-profile', protectRoute, updateProfile);
router.get("/check",protectRoute,checkAuth);//it uses to check wether user is authenticated or not

export default router;