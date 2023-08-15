"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
const router = express_1.default.Router();
router.post('/register', validators_1.registerValidationBody, middlewares_1.validationMiddleware, (0, helpers_1.catchError)(controllers_1.authController.register));
router.post('/login', validators_1.loginValidationBody, middlewares_1.validationMiddleware, (0, helpers_1.catchError)(controllers_1.authController.login));
router.post('/logout', (0, helpers_1.catchError)(controllers_1.authController.logout));
router.get('/refresh', (0, helpers_1.catchError)(controllers_1.authController.refresh));
router.get('/activate/:link', (0, helpers_1.catchError)(controllers_1.authController.activate));
exports.default = router;
