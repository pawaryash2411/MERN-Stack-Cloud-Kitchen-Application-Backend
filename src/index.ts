import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoute from "../src/Routes/UserRoute"
import RestaurantRoute from "../src/Routes/RestaurantRoute"
import Cloudinary from "cloudinary"

const app = express();
app.use(express.json())
app.use(cors())


app.use("/api/v1/user", UserRoute)
app.use("/api/v1/restaurant", RestaurantRoute);

const PORT: string = "7000";


const ConnectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/CloudKitchen").then((data: any) => {
            console.log(`Database connection established on ${data.connection.host}`)
        })
    } catch (error) {
        console.log(error)
    }
}

ConnectDB();

Cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})