import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js"

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token; //for accessing the cookie here we used cookie-parser packege.
    if (!token) {
        return next(errorHandler(400, "Unauthorized, Token is not available"))
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return next(errorHandler(400, "Unauthorized"))
        }
        req.user = user;
        next();
    })
}