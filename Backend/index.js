import express from "express";
import dotenv from "dotenv"
const app = express();
import connectDB from "./db/index.js"

process.on("uncaughtException", function (err) {
    console.log(err);
})
dotenv.config({
    path: "./env"
})

connectDB()
    .then(() => {
        const port = process.env.PORT || 4000
        app.listen(port, () => {
            console.log("Server is running on port !!", port)
        })
    })
    .catch((err) => {
        console.log("Mongodb connection error");
    })
