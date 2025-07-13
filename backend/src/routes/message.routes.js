import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getUserForSidebar ,getMessages,sendMessage} from '../middleware/message.controller'
import router from "./auth.routes";
const express = express.Router();
router.get("/Users", protectRoute, getUserForSidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:",protectRoute,sendMessage);
export default router;