"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const item_1 = require("../controllars/item");
const verifyJwt_1 = require("../middlware/verifyJwt");
const verifyAdmin_1 = require("../middlware/verifyAdmin");
router.get('/get-items', item_1.getItems);
router.post('/create', verifyJwt_1.verifyJwt, item_1.createOneItem);
router.put('/update-items', item_1.updateItems);
router.delete('/delete-all-items', item_1.deleteAllItems);
router.use(verifyJwt_1.verifyJwt, verifyAdmin_1.verifyAdmin);
router.route('/:id')
    .get(item_1.getOneItemMidll, item_1.retrieveOneItem)
    .delete(item_1.getOneItemMidll, item_1.deleteOneItem)
    .patch(item_1.getOneItemMidll, item_1.patchOneItem);
exports.default = router;
