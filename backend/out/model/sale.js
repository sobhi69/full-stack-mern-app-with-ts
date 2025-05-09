"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Item = {
    title: {
        type: String,
        required: true,
        trim: true
    },
    cost: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    minPrice: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        default: "unkown",
        trim: true
    }
};
const saleSchema = new mongoose_1.default.Schema({
    cardItems: {
        type: [Item],
        required: true
    },
    client: {
        // type:Schema.Types.ObjectId,
        // ref:"Client",
        type: String,
        required: false
    },
    salesPerson: {
        // type:Schema.Types.ObjectId,
        // ref:"User",
        type: String,
        required: false
    },
    total: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    addition: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Sale', saleSchema);
