import express from 'express'
import {
    getAllusers,
    getOneUserMidll,
    retrieveOneUser,
    deleteOneUser,
    patchOneUser,
} from '../controllars/user'
import { verifyJwt } from '../middlware/verifyJwt'
import { verifyAdmin } from '../middlware/verifyAdmin'
const router = express.Router()

router.get('/get-users', getAllusers)

router.route('/:id')
    .get(getOneUserMidll, retrieveOneUser)
    .delete(verifyJwt,verifyAdmin,getOneUserMidll, deleteOneUser)
    .patch(verifyJwt,getOneUserMidll, patchOneUser)



export default router

// alright it seems like 
// you wnna create some 