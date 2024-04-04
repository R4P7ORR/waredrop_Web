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
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Transaction.prototype, "transOrigin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Transaction.prototype, "transTarget", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Transaction.prototype, "warehouseId", void 0);
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
                trans_origin: newTrans.transOrigin,
                trans_target: newTrans.transTarget,
                warehouse_warehouse_id: newTrans.warehouseId,
                item_item_id: newTrans.itemId
            }
        });
    }
    async addWorkerToTrans(addInput, workerEmail) {
        return this.db.transactions.update({
            data: {
                worker_email: workerEmail,
            },
            where: {
                trans_id: addInput.transId,
            }
        });
    }
    async getAllTransByUser(user) {
        return this.db.transactions.findMany({
            where: {
                warehouses: {
                    user_assigned_to_warehouse: {
                        some: {
                            user_user_id: user.userId
                        }
                    }
                }
            }
        });
    }
    async getAllTransByWorker(user) {
        return this.db.transactions.findMany({
            where: {
                worker_email: user.userEmail,
            }
        });
    }
    async getAllTrans() {
        return this.db.transactions.findMany();
    }
    async getAvailableTrans() {
        return this.db.transactions.findMany({
            select: {
                trans_id: true,
                trans_post_date: true,
                trans_arrived_date: true,
                trans_origin: true,
                trans_target: true,
                worker_email: true,
                items: {}
            },
            where: {
                worker_email: null
            }
        });
    }
    async updateTrans(updateInput) {
        return this.db.transactions.update({
            data: {
                trans_arrived_date: new Date(Date.now()),
            },
            where: {
                trans_id: updateInput.transId,
            }
        });
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map