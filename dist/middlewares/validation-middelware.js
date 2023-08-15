"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const exceptions_1 = require("../exceptions");
const validationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        next(exceptions_1.ApiError.BadRequest('Validation error', errors.array()));
    }
    next();
};
exports.default = validationMiddleware;
