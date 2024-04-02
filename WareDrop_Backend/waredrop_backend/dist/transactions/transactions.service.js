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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let TransactionsService = class TransactionsService {
    constructor(db) {
        this.db = db;
    }
    async createTrans(newTrans) {
        return this.db.transactions.create({
            data: {
                trans_post_date: Date.now().toString(),
                trans_origin: newTrans.trans_origin,
                trans_target: newTrans.trans_target,
                warehouse_warehouse_id: newTrans.warehouse_warehouse_id,
                item_item_id: newTrans.item_item_id
            }
        });
    }
    async addWorkerToTrans(addInput) {
        return this.db.transactions.update({
            data: {
                worker_id: addInput.worker_id,
            },
            where: {
                trans_id: addInput.trans_id,
            }
        });
    }
    async getAllTransByUser(user_id) {
        return this.db.transactions.findMany({
            where: {
                warehouses: {
                    user_assigned_to_warehouse: {
                        some: {
                            user_user_id: user_id
                        }
                    }
                }
            }
        });
    }
    async getAllTransByWorker(worker_id) {
        return this.db.transactions.findMany({
            where: {
                worker_id: worker_id
            }
        });
    }
    async getAllTrans() {
        return this.db.transactions.findMany();
    }
    async getAvailableTrans() {
        return this.db.transactions.findMany({
            where: {
                worker_id: null
            }
        });
    }
    async updateTrans(updateInput) {
        return this.db.transactions.update({
            data: {
                trans_arrived_date: updateInput.date,
            },
            where: {
                trans_id: updateInput.trans_id,
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