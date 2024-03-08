import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from '../Models/UserModel';

declare global {
    namespace Express {
        interface Request {
            auth0Id: string,
            userId: string
        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_URL,
    tokenSigningAlg: process.env.AUTH0_TOKEN_ALG,
});

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization && authorization?.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "UnAuthorized Token" })
    }

    const token: any = authorization?.split(" ")[1];

    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        const auth0Id = decoded?.sub;

        const user = await UserModel.findOne({ auth0Id });
        console.log("mii", user)
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found!!" })
        }

        if (!user._id) {
            return res.status(401).json({ success: false, message: "User ID not available" });
        }
        console.log("mii222", user._id.toString())
        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();

        next()
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message || "UnAuthorized Token Again" })
    }

}
