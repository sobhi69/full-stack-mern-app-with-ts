import { NextFunction, Response } from "express"
import { RequestToken } from "./verifyJwt"
import UserModel from '../model/user'
export const verifyAdmin = async (req: RequestToken, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.userId)
    const role = user?.role
    if (role == 'Admin') {
        next()
    } else {
        res.status(401).json({ message: "Only users with Admin role can perform this action!" })
    }
}