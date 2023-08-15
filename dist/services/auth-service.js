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
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const exceptions_1 = require("../exceptions");
const prisma_1 = require("../prisma");
const mail_service_1 = __importDefault(require("./mail-service"));
const token_service_1 = __importDefault(require("./token-service"));
class UserService {
    register({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield prisma_1.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (candidate) {
                throw exceptions_1.ApiError.BadRequest('User with this email already exists');
            }
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            const activationLink = (0, uuid_1.v4)();
            const user = yield prisma_1.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    activationLink,
                    name: 'name',
                },
            });
            const { tokens, userDto } = yield token_service_1.default.generatePairAndSave(user);
            yield mail_service_1.default.sendActivationMail(user.email, activationLink);
            return Object.assign(Object.assign({}, tokens), { userDto });
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                throw exceptions_1.ApiError.BadRequest('User with this email does not exist');
            }
            if (!user.activated) {
                throw exceptions_1.ApiError.BadRequest('Please confirm your email before logging in');
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                throw exceptions_1.ApiError.BadRequest('Email or password is wrong');
            const { tokens, userDto } = yield token_service_1.default.generatePairAndSave(user);
            return Object.assign(Object.assign({}, tokens), { userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield token_service_1.default.removeToken(refreshToken);
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    activationLink,
                },
            });
            if (!user)
                throw exceptions_1.ApiError.BadRequest('Incorrect activation link');
            yield prisma_1.prisma.user.update({
                where: {
                    activationLink,
                },
                data: {
                    activated: true,
                },
            });
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw exceptions_1.ApiError.UnathorizedError();
            }
            const userData = token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw exceptions_1.ApiError.UnathorizedError();
            }
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    id: userData.id,
                },
            });
            if (!user)
                throw exceptions_1.ApiError.BadRequest('User is not found');
            const { tokens, userDto } = yield token_service_1.default.generatePairAndSave(user);
            return Object.assign(Object.assign({}, tokens), { userDto });
        });
    }
}
exports.default = new UserService();
