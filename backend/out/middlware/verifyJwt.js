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
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(401).json({ message: "token is not provided" });
        return;
    }
    const token = authorization.split(' ')[1];
    // if (!token) {
    //     res.status(404).json({ message: "token is not provided, please sign-in first!" })
    //     return
    // }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || '');
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error(`error in verifyJtw ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.verifyJwt = verifyJwt;
