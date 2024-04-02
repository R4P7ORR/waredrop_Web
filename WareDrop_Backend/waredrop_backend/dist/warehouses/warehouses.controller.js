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
exports.WarehousesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const jwt_decoder_1 = require("../auth/jwt.decoder");
const warehouses_service_1 = require("./warehouses.service");
let WarehousesController = class WarehousesController {
    constructor(jwt, service) {
        this.jwt = jwt;
        this.service = service;
    }
    addNew(createInput) {
        return this.service.addWarehouse(createInput);
    }
    async addToUser({ user_id, warehouse_name }) {
        return this.service.addWarehouseToUser(user_id, warehouse_name);
    }
    async getWarehousesByUser(req) {
        const decodedJwt = this.jwt.decodeToken(req);
        return this.service.getWarehousesByUser(decodedJwt.sub.id);
    }
    async getWarehouses() {
        return this.service.getWarehouses();
    }
    async getItemsInWarehouse(warehouse_id) {
        return this.service.getItemsInWarehouse(warehouse_id);
    }
};
exports.WarehousesController = WarehousesController;
__decorate([
    (0, common_1.Post)('/addNew'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "addNew", null);
__decorate([
    (0, common_1.Post)('/addToUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "addToUser", null);
__decorate([
    (0, common_1.Get)('/byUser'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "getWarehousesByUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "getWarehouses", null);
__decorate([
    (0, common_1.Post)('/ItemsInWarehouse'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WarehousesController.prototype, "getItemsInWarehouse", null);
exports.WarehousesController = WarehousesController = __decorate([
    (0, common_1.Controller)('warehouses'),
    __metadata("design:paramtypes", [jwt_decoder_1.default, warehouses_service_1.WarehousesService])
], WarehousesController);
//# sourceMappingURL=warehouses.controller.js.map