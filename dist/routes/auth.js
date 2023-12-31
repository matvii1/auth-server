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
const express_1 = __importDefault(require("express"));
const controllers_1 = require("$/dist/controllers");
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.get('/refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.get('/activate/:link', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.get('/users', controllers_1.userController.getAll);
exports.default = router;
