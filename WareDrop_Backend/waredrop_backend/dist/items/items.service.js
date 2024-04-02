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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ItemsService = class ItemsService {
    constructor(db) {
        this.db = db;
    }
    async addItem(newItem) {
        return this.db.items.create({
            data: newItem
        });
    }
    async getItems() {
        return this.db.items.findMany();
    }
    async assignItemToWarehouse(item_id, warehouse_name) {
        const warehouse = await this.db.warehouses.findFirst({
            select: {
                warehouse_id: true,
                location: true,
            },
            where: {
                warehouse_name: warehouse_name,
            }
        });
        return this.db.transactions.create({
            data: {
                trans_post_date: Date.now().toString(),
                trans_arrived_date: Date.now().toString(),
                warehouse_warehouse_id: warehouse.warehouse_id,
                item_item_id: item_id,
                trans_origin: warehouse.location,
                trans_target: warehouse.location,
            }
        });
    }
    async deleteItem(item_id) {
        return this.db.items.delete({
            where: {
                item_id: item_id
            }
        });
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemsService);
//# sourceMappingURL=items.service.js.map