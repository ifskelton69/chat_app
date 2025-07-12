import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getUserForSidebar } from '../middleware/message.controller'
import router from "./auth.routes";
const express = express.Router();
router.get("/Users", protectRoute, getUserForSidebar);
router.get("/:id",protectRoute,getMessages)
export default router;