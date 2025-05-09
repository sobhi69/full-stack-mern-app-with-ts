import express from 'express'
import {
    createSale,
    getSales,
    deleteSales,
    getOneSaleMidll,
    deleteOneSale,
    retrieveOneSale

} from '../controllars/sale'
import { verifyJwt } from '../middlware/verifyJwt'
import { verifyAdmin } from '../middlware/verifyAdmin'
const router = express.Router()

router.get('/get-sales', getSales)
router.post('/create', verifyJwt, createSale)
router.delete('/delete-sales', verifyJwt, verifyAdmin, deleteSales)


router.route('/:id')
    .delete(verifyJwt,verifyAdmin,getOneSaleMidll, deleteOneSale)
    .get(getOneSaleMidll, retrieveOneSale)
//     .patch(getOneSaleMidll, patchOneSale)



export default router