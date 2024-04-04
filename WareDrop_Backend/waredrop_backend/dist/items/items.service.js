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
exports.ItemsService = exports.CreateItemDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const class_validator_1 = require("class-validator");
class CreateItemDto {
}
exports.CreateItemDto = CreateItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "itemName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateItemDto.prototype, "itemQuantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateItemDto.prototype, "warehouseId", void 0);
let ItemsService = class ItemsService {
    constructor(db) {
        this.db = db;
    }
    async addItem(newItem) {
        try {
            const createdItem = await this.db.items.create({
                data: {
                    item_name: newItem.itemName,
                    item_quantity: newItem.itemQuantity
                }
            });
            await this.assignItemToWarehouse(createdItem.item_id, newItem.warehouseId);
            return { Massage: 'Added a new item to the warehouse' };
        }
        catch (e) {
            throw e;
        }
    }
    async getItems() {
        return this.db.items.findMany();
    }
    async assignItemToWarehouse(itemId, warehouseId) {
        const warehouse = await this.db.warehouses.findFirst({
            select: {
                warehouse_id: true,
                location: true,
            },
            where: {
                warehouse_id: warehouseId,
            }
        });
        return this.db.transactions.create({
            data: {
                trans_post_date: new Date(Date.now()),
                trans_arrived_date: new Date(Date.now()),
                warehouse_warehouse_id: warehouse.warehouse_id,
                item_item_id: itemId,
                trans_origin: warehouse.location,
                trans_target: warehouse.location,
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