import { Router } from "express"
import UserController from "../Controllers/UserController";
import { jwtCheck, jwtParse } from "../Middlewares/Auth";

const router = Router();

router.get("/", jwtCheck, jwtParse, UserController.getUserDetail)
router.post("/", jwtCheck, UserController.CreateUser);
router.put("/", jwtCheck, jwtParse, UserController.UpdateUser);

export default router;