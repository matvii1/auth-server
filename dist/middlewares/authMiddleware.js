"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const authMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof exceptions_1.ApiError) {
        res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        });
    }
    res.status(500).json({
        message: 'Unexpected error',
    });
};
exports.default = authMiddleware;
