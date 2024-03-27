import { errorHandler } from "../utils/error.js"
import Comment from "../models/comment.model.js"
export const CreateComment = async (req, res, next) => {
    console.log("Hi");

    try {
        const { userId, postId, content } = req.body
        console.log("Hi user", userId);
        console.log("Hi post", postId);
        console.log("Hi content", content);


        if (userId !== req.user.id) {
            console.log("No user");
            return next(errorHandler(400, " You are not allowed to do comment"))

        }
        const newComment = new Comment({
            userId,
            postId,
            content
        })
        await newComment.save();
        res.status(200).json(newComment)
    } catch (error) {
        next(error)
        console.log("error");
    }
}