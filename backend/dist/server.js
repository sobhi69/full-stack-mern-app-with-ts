"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connectToDb_1 = require("./lib/connectToDb");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const __dirName = path_1.default.resolve();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const user_1 = __importDefault(require("./routes/user"));
const client_1 = __importDefault(require("./routes/client"));
const auth_1 = __importDefault(require("./routes/auth"));
const item_1 = __importDefault(require("./routes/item"));
const sale_1 = __importDefault(require("./routes/sale"));
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Origin", '*');
    next();
});
app.use((0, cors_1.default)({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
// routes
app.use('/api/user', user_1.default);
app.use('/api/client', client_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/item', item_1.default);
app.use('/api/sale', sale_1.default);
// if (process.env.NODE_ENV !== 'development') {
//     app.use(express.static(path.join(__dirName, '..', 'frontend', 'dist')))
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirName, '..', 'frontend', 'dist', 'index.html'))
//     })
// }
(0, connectToDb_1.connectToDb)();
connectToDb_1.connection.once('open', () => {
    console.log(`connected to Database`);
    app.listen(port, () => console.log(`web is alive at http://localhost:${port}`));
});
