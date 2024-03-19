import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";

export const test = (req, res) => {
    res.send("Hig");
};

export const updateUser = async (req, res, next) => {
    try {
        // Ensure that the user making the request matches the user being updated
        if (req.user.id !== req.params.userId) {
            return next(errorHandler(400, "You're not allowed to update the user"));
        }

        // Check if password is provided and hash it
        if (req.body.password) {
            if (req.body.password.length < 6) {
                return next(errorHandler(400, "Password must contain at least 6 characters"));
            }
            req.body.password = bcryptjs.hashSync(req.body.password, 10); // Using 10 rounds for hashing
        }
        if (req.body.email) {

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
                return next(errorHandler(400, "Please enter a valid email"))
            }
        }
        // Validate and update username if provided
        if (req.body.username) {
            const username = req.body.username;
            if (username.length < 7 || username.length > 20) {
                return next(errorHandler(400, "Username length must be between 7-20"));
            }
            if (username.includes(" ")) {
                return next(errorHandler(400, "Username cannot contain empty spaces"));
            }
            if (username !== username.toLowerCase()) {
                return next(errorHandler(400, "Username must be lowercase"));
            }
            if (!/^[a-zA-Z0-9]+$/.test(username)) {
                return next(errorHandler(400, "Username can only contain letters and numbers"));
            }
        }

        // Update user information
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password, // Update all fields provided in the request body
                }
            },
            { new: true } // Return the updated document
        );

        // Omit password from the response
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
