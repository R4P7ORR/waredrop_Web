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
exports.WarehousesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let WarehousesService = class WarehousesService {
    constructor(db) {
        this.db = db;
    }
    async addWarehouse(createInput) {
        return this.db.warehouses.create({
            data: createInput
        });
    }
    async getWarehouses() {
        return this.db.warehouses.findMany();
    }
    async getWarehousesByUser(user_id) {
        const list = await this.db.warehouses.findMany({
            select: {
                warehouse_name: true,
                location: true,
            },
            where: {
                user_assigned_to_warehouse: {
                    some: {
                        user_user_id: user_id,
                    }
                }
            }
        });
        return list;
    }
    async getItemsInWarehouse(warehouse_id) {
        return this.db.transactions.findMany({
            select: {
                items: true,
            },
            where: {
                warehouse_warehouse_id: warehouse_id,
            }
        });
    }
    async addWarehouseToUser(user_id, warehouse_name) {
        const result = await this.db.warehouses.findFirst({
            select: {
                warehouse_id: true,
            },
            where: {
                warehouse_name: warehouse_name,
            }
        });
        return this.db.user_assigned_to_warehouse.create({
            data: {
                user_user_id: user_id,
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