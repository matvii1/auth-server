"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = exports.authRouter = exports.userRouter = void 0;
var user_router_1 = require("./user-router");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(user_router_1).default; } });
var auth_router_1 = require("./auth-router");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_router_1).default; } });
var main_router_1 = require("./main-router");
Object.defineProperty(exports, "mainRouter", { enumerable: true, get: function () { return __importDefault(main_router_1).default; } });
