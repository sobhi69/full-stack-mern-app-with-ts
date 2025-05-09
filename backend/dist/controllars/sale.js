"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveOneSale = exports.deleteOneSale = exports.getOneSaleMidll = exports.deleteSales = exports.getSales = exports.createSale = void 0;
const sale_1 = __importDefault(require("../model/sale"));
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardItems, total, discount, addition, client, salesPerson } = req.body;
    if (!cardItems.length || !total) {
        res.status(400).json({ message: "please select at least one item to the card items" });
        return;
    }
    const newSale = new sale_1.default({
        cardItems,
        total,
        discount,
        addition,
        salesPerson,
        client
    });
    try {
        yield newSale.save();
        res.status(201).json(newSale);
    }
    catch (error) {
        console.error(`error in createSale ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.createSale = createSale;
// alright 
// let's work on the users and clients sections 
// 
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield sale_1.default.find();
        res.json(sales);
    }
    catch (error) {
        console.error(`error in getItems ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.getSales = getSales;
const deleteSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sale_1.default.deleteMany();
        res.json({ message: "deleted" });
    }
    catch (error) {
    }
});
exports.deleteSales = deleteSales;
const getOneSaleMidll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let sale;
    try {
        sale = yield sale_1.default.findById(req.params.id);
        if (!sale) {
            res.status(404).json({ message: `sale with id: ${req.params.id} doesn't exist` });
            return;
        }
    }
    catch (error) {
        console.error(`error in getOneSaleMidll`);
        res.status(500).json({ message: error.message });
    }
    req.sale = sale;
    next();
});
exports.getOneSaleMidll = getOneSaleMidll;
const deleteOneSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sale_1.default.findByIdAndDelete(req.sale._id);
        res.json({ message: "sale deleted" });
    }
    catch (error) {
        console.error(`error in deleteOneSale`);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteOneSale = deleteOneSale;
const retrieveOneSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.sale);
});
exports.retrieveOneSale = retrieveOneSale;
