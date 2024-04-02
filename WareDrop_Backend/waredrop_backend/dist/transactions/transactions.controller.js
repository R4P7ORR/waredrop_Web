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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const jwt_decoder_1 = require("../auth/jwt.decoder");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let TransactionsController = class TransactionsController {
    constructor(service, jwt) {
        this.service = service;
        this.jwt = jwt;
    }
    async addTrans(newTrans) {
        return await this.service.createTrans(newTrans);
    }
    async addWorker(addInput) {
        return this.service.addWorkerToTrans(addInput);
    }
    getAllTrans() {
        return this.service.getAllTrans();
    }
    getAvailable() {
        return this.service.getAvailableTrans();
    }
    async getAllTransByUser(req) {
        const user = this.jwt.decodeToken(req);
        return this.service.getAllTransByUser(user.sub.id);
    }
    async getAllTransByWorker(req) {
        const user = this.jwt.decodeToken(req);
        return this.service.getAllTransByWorker(user.sub.id);
    }
    async updateTrans(input) {
        return this.service.updateTrans(input);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Post)('/newTrans'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "addTrans", null);
__decorate([
    (0, common_1.Post)('/addWorkerToTrans'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "addWorker", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "getAllTrans", null);
__decorate([
    (0, common_1.Get)('/available'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "getAvailable", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getAllTransByUser", null);
__decorate([
    (0, common_1.Get)('/worker'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getAllTransByWorker", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "updateTrans", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService, jwt_decoder_1.default])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map