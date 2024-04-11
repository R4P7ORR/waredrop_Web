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
exports.WarehousesService = exports.AddWarehouseDto = exports.WarehouseDto = exports.WarehouseUpdateInput = exports.WarehouseCreateInput = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
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
class WarehouseUpdateInput {
}
exports.WarehouseUpdateInput = WarehouseUpdateInput;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], WarehouseUpdateInput.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WarehouseUpdateInput.prototype, "warehouseName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WarehouseUpdateInput.prototype, "warehouseLocation", void 0);
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
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddWarehouseDto.prototype, "warehouseId", void 0);
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
    async getWarehouseById(warehouseInput) {
        return this.db.warehouses.findFirst({
            where: {
                warehouse_id: warehouseInput.warehouseId,
            }
        });
    }
    async getWarehousesByUser(user) {
        return this.db.warehouses.findMany({
            where: {
                assigned_user_id: user.userId
            }
        });
    }
    async getItemsInWarehouse(warehouseDto) {
        const result = await this.db.items.findMany({
            where: {
                warehouse_id: warehouseDto.warehouseId,
            }
        });
        return result.map((item) => item);
    }
    async addWarehouseToUser(addInput) {
        return this.db.warehouses.update({
            where: {
                warehouse_id: addInput.warehouseId
            },
            data: {
                assigned_user_id: addInput.userId
            }
        });
    }
    async updateWarehouse(input) {
        let result;
        if (input.warehouseLocation) {
            result = this.db.warehouses.update({
                where: {
                    warehouse_id: input.warehouseId
                },
                data: {
                    warehouse_name: input.warehouseName
                }
            });
        }
        else if (input.warehouseName) {
            result = this.db.warehouses.update({
                where: {
                    warehouse_id: input.warehouseId
                },
                data: {
                    location: input.warehouseLocation
                }
            });
        }
        else {
            result = this.db.warehouses.update({
                where: {
                    warehouse_id: input.warehouseId
                },
                data: {
                    warehouse_name: input.warehouseName,
                    location: input.warehouseLocation
                }
            });
        }
        return result;
    }
    async deleteWarehouse(deleteInput) {
        try {
            const result = await this.db.warehouses.delete({
                where: {
                    warehouse_id: deleteInput.warehouseId
                }
            });
            if (result) {
                return { result, message: 'Warehouse deleted' };
            }
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2003') {
                return { errorMassage: "Warehouse is not empty" };
            }
            else {
                throw e;
            }
        }
    }
};
exports.WarehousesService = WarehousesService;
exports.WarehousesService = WarehousesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WarehousesService);
//# sourceMappingURL=warehouses.service.js.map