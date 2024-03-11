import { Request, Response } from "express";
import RestaurantModel from "../Models/RestaurantModel";
import Mongoose from "mongoose";
import cloudinary from "cloudinary";

const CreateRestaurant = async (req: Request, res: Response) => {
    try {
        // If user already create a restaurant PS: One user can Crate Only One Restaurant
        const existingRestaurant = await RestaurantModel.findOne({ user: req.userId });
        console.log("existingRestaurant", existingRestaurant);

        if (existingRestaurant) {
            return res.status(409).json({ success: false, message: "Restaurant already exists!!" })
        }

        // if (!req.file) {
        //     return res.status(404).json({ success: false, message: "File Not found!!" })
        // }

        // const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`

        // const result = await cloudinary.v2.uploader.upload(req.file.buffer.toString('base64'), { folder: "restaurants" });
        const restaurant = new RestaurantModel({
            ...req.body,
            // imageUrl: result.secure_url,
            user: new Mongoose.Types.ObjectId(req.userId),
            lastUpdated: new Date()
        })

        await restaurant.save()

        res.status(201).json({ success: true, message: "Restaurant Create Successfully!!", restaurant })

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" })
    }
}


export default { CreateRestaurant }
