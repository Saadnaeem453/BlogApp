import express from "express";
import { verifyUser } from "../utils/verifyUser.js"
import { CreateComment } from "../controllers/comment.controller.js";
import { GetComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyUser, CreateComment)
router.get("/getPostComments/:postId", GetComment)

export default router;