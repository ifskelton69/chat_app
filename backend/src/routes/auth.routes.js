import express from "express";
import { login, logout, signUp,updateprofile, checkAuth } from "../controller/auth.controller.js";
import {protectRoute} from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',login);
router.post('/logout',logout);

router.put('/updateprofile',protectRoute,updateprofile);
router.get("/check",protectRoute,checkAuth);//it uses to check wether user is authenticated or not

export default router;