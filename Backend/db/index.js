import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const connectDB = async () => {

    try {
        const connectionInstance = mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`Mongodb is connected !! DB HOST`);
    } catch (error) {
        console.log("MongoDb error while connecting", error);
        process.exit(1)
    }
}
export default connectDB