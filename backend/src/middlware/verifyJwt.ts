import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface RequestToken extends Request {
    userId?: string
}

export const verifyJwt = async (req: RequestToken, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(401).json({ message: "token is not provided" })
        return
    }
    const token = authorization.split(' ')[1]
    // if (!token) {
    //     res.status(404).json({ message: "token is not provided, please sign-in first!" })
    //     return
    // }

    try {
        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET || '')
        req.userId = decoded.userId
        next()
    } catch (error: any) {
        console.error(`error in verifyJtw ${error}`)
        res.status(500).json({ message: error.message })
    }
}