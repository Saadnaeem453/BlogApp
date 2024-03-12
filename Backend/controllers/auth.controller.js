// import { response } from "express";
import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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
export const signin = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password || email === "" || password === "") {
        next(errorHandler(400, "All feilds are required "))
    }
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, "Invalid Credientials!!"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(404, "Invalid Credientials!!"))
        }

        const token = jwt.sign(
            { id: validUser._id }, process.env.JWT_KEY
        )
        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie("access-cookie", token, {
            httpOnly: true
        }).json(rest)



    } catch (error) {
        next(error)
    }
}