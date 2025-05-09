import express from 'express'
import {
    createOneClient,
    getAllClients,
    getOneClientMidll,
    deleteClient,
    patchClient,
    retrieveOneClient
} from '../controllars/client'
import { verifyJwt } from '../middlware/verifyJwt'
import { verifyAdmin } from '../middlware/verifyAdmin'
const router = express.Router()

router.post('/create',verifyJwt, createOneClient)
router.get('/get-clients', getAllClients)

router.route('/:id')
    .get(verifyJwt,getOneClientMidll,retrieveOneClient)
    .delete(verifyJwt,verifyAdmin,getOneClientMidll,deleteClient)
    .patch(verifyJwt,verifyAdmin,getOneClientMidll,patchClient)



export default router