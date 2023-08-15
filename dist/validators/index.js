"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidationBody = exports.loginValidationBody = void 0;
var login_validator_1 = require("./login-validator");
Object.defineProperty(exports, "loginValidationBody", { enumerable: true, get: function () { return __importDefault(login_validator_1).default; } });
var register_validator_1 = require("./register-validator");
Object.defineProperty(exports, "registerValidationBody", { enumerable: true, get: function () { return __importDefault(register_validator_1).default; } });
