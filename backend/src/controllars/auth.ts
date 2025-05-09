import { Request, Response } from "express"
import UserModel from '../model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import RegisterData from "../interfaces/ResiterData"
import AuthData from "../interfaces/AuthData"

export const register = async (req: Request, res: Response) => {
    const { username, email, phone, password, role }: RegisterData = req.body

    if (
        !username ||
        !email ||
        !password ||
        !phone ||
        !role
    ) {
        res.status(400).json({ message: "please fill out the entire form" })
        return
    }

    if (password.length < 6 || password.length > 255) {
        res.status(400).json({ message: "password must be more than 6 charachters and less than 255 and!" })
        return
    }

    const conflictEmail = await UserModel.findOne({ email: email })
    const conflictUsername = await UserModel.findOne({ email: email })

    if (conflictEmail) {
        res.status(409).json({ message: "Please enter diffrent email, this email already exists!" })
        return
    }
    if (conflictUsername) {
        res.status(409).json({ message: "Please enter diffrent username!" })
        return
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    const newUser = await UserModel.create({
        username,
        email,
        phone,
        password: hashedPwd,
        role,
    })



    try {
        const userToSend = await UserModel.findById(newUser._id).select('-password')
        res.status(201).json(userToSend)
    } catch (error) {
        console.error(`error in register ${error}`)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
            return
        }
        res.status(500).json({ message: "unkown error in register" })
    }

}


export const signIn = async (req: Request, res: Response) => {
    const { email, password }: AuthData = req.body

    if (!email || !password) {
        res.status(400).json({ message: "please fill out the entire form" })
        return
    }


    const foundUser = await UserModel.findOne({ email: email })
    if (!foundUser) {
        res.status(400).json({ message: "Wrong eamil!" })
        return
    }

    const pwdMatch = await bcrypt.compare(password, foundUser.password)

    if (!pwdMatch) {
        res.status(400).json({ message: "Wrong password!" })
        return
    }

    // jwts


    const token = jwt.sign({ userId: foundUser._id }, process.env.TOKEN_SECRET || "", {
        expiresIn: "7d"
    })

    // const accessToken = jwt.sign({ userId: foundUser._id }, process.env.ACCESS_TOKEN_SECRET || "", {
    // expiresIn: "60s"
    // })

    // res.cookie('jwt', token, {
    //     secure: process.env.NODE_ENV != 'development',
    //     httpOnly: true,
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //     sameSite: 'strict'
    // })

    try {
        const userToSend = await UserModel.findByIdAndUpdate(foundUser._id, { $set: { token: token } }, { new: true }).select('-password')
        res.json(userToSend)
    } catch (error) {
        console.error(`error signIn ${error}`)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
            return
        }
        res.status(500).json({ message: "unkown error occured in sign-in" })
    }

}


export const logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        "httpOnly": true,
        "sameSite": "strict"
    })

    try {
        res.json({ message: "logged out seccessfully!" })

    } catch (error: any) {
        console.error(`error in logOut`)
        res.status(500).json({ message: error.message })
    }
}