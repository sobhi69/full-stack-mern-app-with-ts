"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../controllars/auth");
router.post('/register', auth_1.register);
router.post('/sign-in', auth_1.signIn);
router.get('/logout', auth_1.logout);
exports.default = router;
