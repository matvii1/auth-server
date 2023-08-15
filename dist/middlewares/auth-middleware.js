"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const services_1 = require("../services");
const authMiddleware = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders)
        throw exceptions_1.ApiError.UnathorizedError();
    const [bearer, token] = authHeaders.split(' ');
    if (bearer !== 'Bearer' || !token) {
        throw exceptions_1.ApiError.UnathorizedError();
    }
    const userData = services_1.tokenService.validateAccessToken(token);
    if (!userData) {
        throw exceptions_1.ApiError.UnathorizedError();
    }
    req.user = userData;
    next();
};
exports.default = authMiddleware;
