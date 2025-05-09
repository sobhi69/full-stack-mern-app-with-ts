"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllars/user");
const verifyJwt_1 = require("../middlware/verifyJwt");
const verifyAdmin_1 = require("../middlware/verifyAdmin");
const router = express_1.default.Router();
router.get('/get-users', user_1.getAllusers);
router.route('/:id')
    .get(user_1.getOneUserMidll, user_1.retrieveOneUser)
    .delete(verifyJwt_1.verifyJwt, verifyAdmin_1.verifyAdmin, user_1.getOneUserMidll, user_1.deleteOneUser)
    .patch(verifyJwt_1.verifyJwt, user_1.getOneUserMidll, user_1.patchOneUser);
exports.default = router;
// alright it seems like 
// you wnna create some 
