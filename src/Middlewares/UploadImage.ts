import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";

export const uploadSingleImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            req.uploadedImageUrl = undefined;
            next();
            return res.status(404).json({ success: false, message: "Image not found!!" });

        }

        const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.v2.uploader.upload(dataUrl);

        req.uploadedImageUrl = result.secure_url;

        next();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

