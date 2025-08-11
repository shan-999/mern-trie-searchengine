"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = require("./config/connect");
const searchRouters_1 = __importDefault(require("./routes/searchRouters"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const URL = process.env.URL;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: URL,
    methods: '*',
    allowedHeaders: '*',
}));
(0, connect_1.connectDB)();
app.use('/', searchRouters_1.default);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
