import express from "express";
import { verifyUser } from "../utils/verifyUser.js"
import { create } from "../controllers/post.controller.js";
const router = express.Router();
router.post("/create", verifyUser, create)
export default router