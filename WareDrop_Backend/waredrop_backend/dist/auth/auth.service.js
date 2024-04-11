"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.TokenData = exports.AuthPayloadDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const permissions_service_1 = require("../permissions/permissions.service");
const class_validator_1 = require("class-validator");
class AuthPayloadDto {
}
exports.AuthPayloadDto = AuthPayloadDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthPayloadDto.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthPayloadDto.prototype, "userPassword", void 0);
class TokenData {
}
exports.TokenData = TokenData;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], TokenData.prototype, "sub", void 0);
let AuthService = class AuthService {
    constructor(jwtService, usersService, permissionService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.permissionService = permissionService;
    }
    async validateUser(input) {
        const user = await this.usersService.findUser(input.userEmail);
        if (user && await bcrypt.compare(input.userPassword, user.user_password)) {
            const payload = {
                sub: {
                    id: user.user_id,
                    email: user.user_email,
                    userPermissions: await this.permissionService
                        .getPermissionsByUser({ userId: user.user_id, userEmail: user.user_email }),
                },
            };
            return {
                accessToken: this.jwtService.sign(payload),
            };
        }
        else {
            throw new common_1.BadRequestException("Wrong password or user name");
        }
    }
    async register(newUser) {
        const user = await this.usersService.findUser(newUser.userEmail);
        if (user) {
            throw new common_1.BadRequestException('User already exist');
        }
        else {
            const result = await this.usersService.createUser(newUser);
            if (result) {
                return { message: "User created" };
            }
        }
    }
    async registerWorker(newUser) {
        const user = await this.usersService.findUser(newUser.userEmail);
        if (user) {
            throw new common_1.BadRequestException('User already exist');
        }
        else {
            const result = await this.usersService.createWorker(newUser);
            if (result) {
                return { message: "User created" };
            }
        }
    }
    async isAdmin(user_permissions) {
        for (const permission of user_permissions) {
            if (permission.permissionName === 'All') {
                return { isAdmin: true };
            }
        }
        return { isAdmin: false };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        permissions_service_1.PermissionsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map