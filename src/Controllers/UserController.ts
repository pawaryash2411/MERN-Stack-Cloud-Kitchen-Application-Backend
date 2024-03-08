import { Request, Response } from "express"
import UserModel from "../Models/UserModel";

const getUserDetail = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ _id: req.userId });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!!" })
        }

        res.status(200).json({ success: true, message: "Fetched successfully", user })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" })
    }
}

const CreateUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;

        const existing = await UserModel.findOne({ auth0Id });
        if (existing) {
            return res.status(200).json({ message: "User already exists!!" })
        }
        const NewUser = new UserModel(req.body);
        await NewUser.save();

        res.status(201).json({ success: true, message: "User Created Successfully!!", NewUser })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" })
    }
}

const UpdateUser = async (req: Request, res: Response) => {
    try {

        const { email, address, city, country, phone, name } = req.body;

        const findUser = await UserModel.findById(req.userId);
        if (!findUser) {
            return res.status(404).json({ success: false, message: "User not Found!!" })
        }

        findUser.name = name;
        findUser.address = address;
        findUser.city = city;
        findUser.phone = phone;
        findUser.email = email;
        findUser.country = country;

        await findUser.save();

        return res.status(200).json({ success: true, message: "Updated Successfully!!" })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" })
    }
}


export default {
    CreateUser, UpdateUser, getUserDetail
};