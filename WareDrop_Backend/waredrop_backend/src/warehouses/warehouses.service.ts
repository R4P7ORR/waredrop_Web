import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";

export interface Warehouse {
    warehouse_name: string,
    location: string,
}

@Injectable()
export class WarehousesService {
    constructor(private readonly db: PrismaService) {
    }

    async addWarehouse(createInput: Warehouse){
        return this.db.warehouses.create({
            data: createInput
        })
    }

    async getWarehouses(){
        return this.db.warehouses.findMany();
    }

    async getWarehousesByUser(user_id: number){
        const list: Warehouse[]= await this.db.warehouses.findMany({
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
        })
        return list
    }

    async addWarehouseToUser(user_id: number, warehouse_name: string){
        const result = await this.db.warehouses.findFirst({
            select: {
                warehouse_id: true,
            },
            where: {
                warehouse_name: warehouse_name,
            }
        })
        return this.db.user_assigned_to_warehouse.create({
            data: {
                user_user_id: user_id,
                warehouse_warehouse_id: result.warehouse_id
            }
        })
    }
}
