import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";

export interface WarehouseCreateInput {
    warehouseName: string,
    location: string,
}

export interface WarehouseDto{
    warehouseId: number,
}

export interface AddWarehouseDto {
    userId: number,
    warehouseName: string,
}

export interface AssignWarehouseInput {

}

@Injectable()
export class WarehousesService {
    constructor(private readonly db: PrismaService) { }

    async addWarehouse(createInput: WarehouseCreateInput){
        return this.db.warehouses.create({
            data: {
                warehouse_name: createInput.warehouseName,
                location: createInput.location,
            }
        })
    }

    async getWarehouses(){
        return this.db.warehouses.findMany();
    }

    async getWarehousesByUser(user: UserDto){
        return this.db.warehouses.findMany({
            where: {
                user_assigned_to_warehouse: {
                    some: {
                        user_user_id: user.userId,
                    }
                }
            }
        })
    }

    async getItemsInWarehouse(warehouseDto: WarehouseDto){
        return this.db.transactions.findMany({
            select:{
                items: true,
            },
            where: {
                warehouse_warehouse_id: warehouseDto.warehouseId,
            }
        })
    }

    async addWarehouseToUser(addInput: AddWarehouseDto){
        const result = await this.db.warehouses.findFirst({
            select: {
                warehouse_id: true,
            },
            where: {
                warehouse_name: addInput.warehouseName,
            }
        })
        return this.db.user_assigned_to_warehouse.create({
            data: {
                user_user_id: addInput.userId,
                warehouse_warehouse_id: result.warehouse_id
            }
        })
    }
}
