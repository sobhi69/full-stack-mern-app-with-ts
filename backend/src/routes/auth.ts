import express from 'express'
const router = express.Router()
import {
    register,
    signIn,
    logout
} from '../controllars/auth'


router.post('/register', register)
router.post('/sign-in', signIn)
router.get('/logout', logout)

export default router