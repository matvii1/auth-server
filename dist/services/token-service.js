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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dtos_1 = require("../dtos");
const exceptions_1 = require("../exceptions");
const prisma_1 = require("../prisma");
class TokenService {
    generateTokens(payload) {
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
        const ACCESS_TOKEN = jsonwebtoken_1.default.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: '15s',
        });
        const REFRESH_TOKEN = jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: '30s',
        });
        return {
            accessToken: ACCESS_TOKEN,
            refreshToken: REFRESH_TOKEN,
        };
    }
    generatePairAndSave(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = Object.assign({}, new dtos_1.UserDto(user));
            const tokens = this.generateTokens(userDto);
            yield this.saveToken(user.id, tokens.refreshToken);
            return {
                tokens,
                userDto,
            };
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield prisma_1.prisma.token.findUnique({
                where: {
                    refreshToken,
                },
            });
            if (!token) {
                throw exceptions_1.ApiError.BadRequest('Something went wrong');
            }
            yield prisma_1.prisma.token.delete({
                where: {
                    refreshToken,
                },
            });
        });
    }
    saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield prisma_1.prisma.token.findUnique({
                where: {
                    refreshToken,
                },
            });
            if (token) {
                yield prisma_1.prisma.token.update({
                    where: {
                        refreshToken,
                    },
                    data: {
                        refreshToken: refreshToken,
                    },
                });
            }
            else {
                yield prisma_1.prisma.token.create({
                    data: {
                        refreshToken: refreshToken,
                        userId,
                    },
                });
            }
        });
    }
    validateRefreshToken(refreshToken) {
        try {
            const userData = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (_a) {
            return null;
        }
    }
    validateAccessToken(accessToken) {
        try {
            const userData = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (_a) {
            return null;
        }
    }
    findToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundToken = yield prisma_1.prisma.token.findUnique({
                where: {
                    refreshToken: token,
                },
            });
            return foundToken;
        });
    }
}
exports.default = new TokenService();
