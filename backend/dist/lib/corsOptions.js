"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
// const allowedOrigins = ['http://localhost:3011', "http://localhost:5174",]
exports.corsOptions = {
    origin: (origin, cb) => {
        console.log(origin);
        cb(null, true);
        // if (!origin || allowedOrigins.indexOf(origin) != -1) {
        // } else {
        //     cb(new Error('Error, not allowed from Cors'))
        // }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};
