import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
const app = express();
app.use(express.json());
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
app.use("/api/auth", authRoute);
// Creatig a middleware for the error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message: message,

    })
})