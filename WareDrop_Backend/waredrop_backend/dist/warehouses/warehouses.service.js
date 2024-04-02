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
exports.WarehousesService = exports.AddWarehouseDto = exports.WarehouseDto = exports.WarehouseCreateInput = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const class_validator_1 = require("class-validator");
class WarehouseCreateInput {
}
exports.WarehouseCreateInput = WarehouseCreateInput;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WarehouseCreateInput.prototype, "warehouseName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WarehouseCreateInput.prototype, "warehouseLocation", void 0);
class WarehouseDto {
}
exports.WarehouseDto = WarehouseDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], WarehouseDto.prototype, "warehouseId", void 0);
class AddWarehouseDto {
}
exports.AddWarehouseDto = AddWarehouseDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddWarehouseDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddWarehouseDto.prototype, "warehouseName", void 0);
let WarehousesService = class WarehousesService {
    constructor(db) {
        this.db = db;
    }
    async addWarehouse(createInput) {
        return this.db.warehouses.create({
            data: {
                warehouse_name: createInput.warehouseName,
                location: createInput.warehouseLocation,
            }
        });
    }
    async getWarehouses() {
        return this.db.warehouses.findMany();
    }
    async getWarehousesByUser(user) {
        return this.db.warehouses.findMany({
            where: {
                user_assigned_to_warehouse: {
                    some: {
                        user_user_id: user.userId,
                    }
                }
            }
        });
    }
    async getItemsInWarehouse(warehouseDto) {
        const result = await this.db.transactions.findMany({
            select: {
                items: {
                    select: {
                        item_id: true,
                        item_name: true,
                        item_quantity: true,
                    }
                },
            },
            where: {
                warehouse_warehouse_id: warehouseDto.warehouseId,
            }
        });
        return result.map((item) => item.items);
    }
    async addWarehouseToUser(addInput) {
        const result = await this.db.warehouses.findFirst({
            select: {
                warehouse_id: true,
            },
            where: {
                warehouse_name: addInput.warehouseName,
            }
        });
        return this.db.user_assigned_to_warehouse.create({
            data: {
                user_user_id: addInput.userId,
                warehouse_warehouse_id: result.warehouse_id
            }
        });
    }
};
exports.WarehousesService = WarehousesService;
exports.WarehousesService = WarehousesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WarehousesService);
//# sourceMappingURL=warehouses.service.js.map