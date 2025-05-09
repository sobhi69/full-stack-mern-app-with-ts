"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sale_1 = require("../controllars/sale");
const verifyJwt_1 = require("../middlware/verifyJwt");
const verifyAdmin_1 = require("../middlware/verifyAdmin");
const router = express_1.default.Router();
router.get('/get-sales', sale_1.getSales);
router.post('/create', verifyJwt_1.verifyJwt, sale_1.createSale);
router.delete('/delete-sales', verifyJwt_1.verifyJwt, verifyAdmin_1.verifyAdmin, sale_1.deleteSales);
router.route('/:id')
    .delete(verifyJwt_1.verifyJwt, verifyAdmin_1.verifyAdmin, sale_1.getOneSaleMidll, sale_1.deleteOneSale)
    .get(sale_1.getOneSaleMidll, sale_1.retrieveOneSale);
//     .patch(getOneSaleMidll, patchOneSale)
exports.default = router;
