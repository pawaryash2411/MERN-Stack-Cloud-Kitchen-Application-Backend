import { Router } from "express";
import Multer from "multer";
import RestaurantController from "../Controllers/RestaurantController";
import { jwtCheck, jwtParse } from "../Middlewares/Auth";

const router = Router()
const storage = Multer.memoryStorage();

const upload = Multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5 mb
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
})

router.post("/", jwtCheck, jwtParse, RestaurantController.CreateRestaurant)

export default router;