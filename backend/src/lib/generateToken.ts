import jwt from "jsonwebtoken"

export const generateToken = (id:string) => {
    return jwt.sign({userId:id},process.env.TOKEN_SECRET || '12345',{
        expiresIn:"7d"
    })
}