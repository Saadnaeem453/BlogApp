// import { response } from "express";
import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === "" || email === "" || password == "") {
        return res.status(400).json({ error: "Please fill all the fields" });
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
        res.json("Signup successful")
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}