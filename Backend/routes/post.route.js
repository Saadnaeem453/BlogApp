import express from "express";
import { verifyUser } from "../utils/verifyUser.js"
import { create, getPost } from "../controllers/post.controller.js";
const router = express.Router();
router.post("/create", verifyUser, create)
router.get("/getposts", getPost)
export default router