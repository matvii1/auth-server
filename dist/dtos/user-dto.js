"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.activated;
    }
}
exports.UserDto = UserDto;
