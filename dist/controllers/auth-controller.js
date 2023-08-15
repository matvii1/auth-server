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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const services_1 = require("../services");
class AuthController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userData = yield services_1.authService.register({ email, password });
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });
            res.status(201).json(userData);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userData = yield services_1.authService.login({ email, password });
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });
            res.json(userData);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            yield services_1.authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json({
                refreshToken,
            });
        });
    }
    activate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { link } = req.params;
            yield services_1.authService.activate(link);
            res.redirect(process.env.CLIENT_URL + '/login');
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.cookies;
            const userData = yield services_1.authService.refresh(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });
            res.json(userData);
        });
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
