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
exports.TransactionsService = exports.WorkerUpdateInput = exports.Transaction = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const class_validator_1 = require("class-validator");
class Transaction {
}
exports.Transaction = Transaction;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Transaction.prototype, "transId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Transaction.prototype, "transArrivedDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Transaction.prototype, "transOriginId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Transaction.prototype, "transTargetId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Transaction.prototype, "itemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Transaction.prototype, "workerEmail", void 0);
class WorkerUpdateInput {
}
exports.WorkerUpdateInput = WorkerUpdateInput;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], WorkerUpdateInput.prototype, "transId", void 0);
let TransactionsService = class TransactionsService {
    constructor(db) {
        this.db = db;
    }
    async createTrans(newTrans) {
        return this.db.transactions.create({
            data: {
                trans_post_date: new Date(Date.now()),
                trans_origin_id: newTrans.transOriginId,
                trans_target_id: newTrans.transTargetId,
                item_item_id: newTrans.itemId
            }
        });
    }
    async getAllTransByWorker(user) {
        return this.db.transactions.findMany({
            where: {
                worker_email: user.userEmail,
                trans_arrived_date: null
            },
            include: {
                items: {
                    select: { item_name: true, item_quantity: true }
                }
            }
        });
    }
    async getAllTrans() {
        return this.db.transactions.findMany({
            include: {
                items: {
                    select: { item_name: true, item_quantity: true }
                }
            }
        });
    }
    async getAvailableTrans() {
        return this.db.transactions.findMany({
            where: {
                worker_email: null
            },
            include: {
                items: {
                    select: { item_name: true, item_quantity: true }
                }
            }
        });
    }
    async getTransDone(input) {
        return this.db.transactions.findMany({
            where: {
                worker_email: input.userEmail,
            },
            include: {
                items: true
            }
        });
    }
    async addWorkerToTrans(addInput, workerEmail) {
        return this.db.transactions.update({
            where: {
                trans_id: addInput.transId
            },
            data: {
                worker_email: workerEmail,
            }
        });
    }
    async updateTrans(updateInput) {
        const result = await this.db.transactions.update({
            data: {
                trans_arrived_date: new Date(Date.now()),
            },
            where: {
                trans_id: updateInput.transId,
            }
        });
        await this.db.items.update({
            where: {
                item_id: result.item_item_id
            },
            data: {
                warehouse_id: result.trans_target_id
            }
        });
        return result;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map