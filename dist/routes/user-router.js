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
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const prisma_1 = require("../prisma");
const router = express_1.default.Router();
router.get('/users', middlewares_1.authMiddleware, (0, helpers_1.catchError)(controllers_1.userController.getAll));
// TODO: remove. THIS IS FOR DEV
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.user.deleteMany();
    res.json({
        deleted: true,
    });
}));
exports.default = router;
