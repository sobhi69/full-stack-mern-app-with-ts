import express from 'express'
const router = express.Router()
import {
    createOneItem,
    getItems,
    deleteAllItems,
    getOneItemMidll,
    retrieveOneItem,
    deleteOneItem,
    patchOneItem,
    updateItems
} from '../controllars/item';
import { verifyJwt } from '../middlware/verifyJwt';
import { verifyAdmin } from '../middlware/verifyAdmin';

router.get('/get-items', getItems)

router.post('/create', verifyJwt ,createOneItem)
router.put('/update-items',updateItems)
router.delete('/delete-all-items', deleteAllItems)

router.use(verifyJwt,verifyAdmin)
router.route('/:id')
    .get(getOneItemMidll, retrieveOneItem)
    .delete(getOneItemMidll, deleteOneItem)
    .patch(getOneItemMidll, patchOneItem)



export default router