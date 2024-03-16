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
export const google = async (req, res, next) => {
    console.log("Hi Saad");
    const { email, name, googlePhotoUrl } = req.body;
    console.log("email", email)
    try {
        const user = await User.findOne({ email })
        if (user) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
            const { password, ...rest } = user._doc;
            console.log("token", token);
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
            }).json(rest)
        } else {
            // Here we create a random password for new user / user can change it later
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({
                username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true,

            }).json(rest)
        }
    } catch (error) {
        next(error)
        console.log('Error in google signin');

    }
}