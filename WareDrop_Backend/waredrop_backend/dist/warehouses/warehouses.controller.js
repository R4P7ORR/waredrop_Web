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
const permission_guard_1 = require("../auth/guards/permission.guard");
const permission_decorator_1 = require("../auth/guards/permission.decorator");
let WarehousesController = class WarehousesController {
    constructor(jwt, service) {
        this.jwt = jwt;
        this.service = service;
    }
    addNew(createInput) {
        return this.service.addWarehouse(createInput);
    }
    getWarehouses() {
        return this.service.getWarehouses();
    }
    getWarehouseById(id) {
        const warehouseInput = { warehouseId: parseInt(id) };
        return this.service.getWarehouseById(warehouseInput);
    }
    getWarehousesByUser(req) {
        const decodedJwt = this.jwt.decodeToken(req);
        return this.service.getWarehousesByUser({ userId: decodedJwt.sub.id, userEmail: decodedJwt.sub.email });
    }
    getItemsInWarehouse(warehouseString) {
        const warehouseId = { warehouseId: parseInt(warehouseString) };
        return this.service.getItemsInWarehouse(warehouseId);
    }
    updateWarehouse(warehouseDto) {
        return this.service.updateWarehouse(warehouseDto);
    }
    addToUser(addInput) {
        return this.service.addWarehouseToUser(addInput);
    }
    deleteWarehouse(deleteInput) {
        return this.service.deleteWarehouse(deleteInput);
    }
};
exports.WarehousesController = WarehousesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequiredPermission)([{ permissionName: 'All' }]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouses_service_1.WarehouseCreateInput]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "addNew", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequiredPermission)([{ permissionName: 'All' }]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "getWarehouses", null);
__decorate([
    (0, common_1.Get)('/warehouse/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequiredPermission)([{ permissionName: 'All' }, { permissionName: 'Transactions' }]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "getWarehouseById", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "getWarehousesByUser", null);
__decorate([
    (0, common_1.Get)('/items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "getItemsInWarehouse", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequiredPermission)([{ permissionName: 'All' }]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouses_service_1.WarehouseUpdateInput]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "updateWarehouse", null);
__decorate([
    (0, common_1.Patch)('/assignUser'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequiredPermission)([{ permissionName: 'All' }]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouses_service_1.AddWarehouseDto]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "addToUser", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequiredPermission)([{ permissionName: 'All' }]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouses_service_1.WarehouseDto]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "deleteWarehouse", null);
exports.WarehousesController = WarehousesController = __decorate([
    (0, common_1.Controller)('warehouses'),
    __metadata("design:paramtypes", [jwt_decoder_1.default,
        warehouses_service_1.WarehousesService])
], WarehousesController);
//# sourceMappingURL=warehouses.controller.js.map