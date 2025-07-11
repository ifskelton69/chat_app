import express from "express";
import { login, logout, signup,updateprofile } from "../controller/auth.controller.js";
import {protectRoute} from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

router.put('/updateprofile',protectRoute,updateprofile)

export default router;