// import { response } from "express";
import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === "" || email === "" || password == "") {
        next(errorHandler(400, "All feilds required"))
    }
    // Theres no need to await for hashing , hashSync has already await in itself
    const hashPassword = bcryptjs.hashSync(password, 10)
    const user = new User({
        username,
        email,
        password: hashPassword
    })
    try {
        await user.save()
        return res.json("Signup successful")
    } catch (error) {
        next(error)
    }

}