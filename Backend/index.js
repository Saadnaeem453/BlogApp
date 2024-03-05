import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import userRoute from "./routes/user.route.js"
const app = express();

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

// Beacuse we define the route in another file so we use it as a middle ware and wil "use"
app.use("/api/user", userRoute);