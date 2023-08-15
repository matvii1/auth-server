"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
console.log('here', process.env.CLIENT_URL);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', routes_1.mainRouter);
app.use(middlewares_1.errorMiddleware);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
