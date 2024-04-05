import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {IsNotEmpty, IsNumber,} from "class-validator";

export class StockDto {
    @IsNumber()
    @IsNotEmpty()
    itemId: number

    @IsNumber()
    @IsNotEmpty()
    warehouseId: number
}

@Injectable()
export class StockService {
    constructor(private readonly db: PrismaService) {
    }

    async addStock(input: StockDto){
        return this.db.stock.create({
            data: {item_item_id: input.itemId, warehouse_warehouse_id: input.warehouseId}
        })
    }

    async deleteStock(input: StockDto) {
        return this.db.stock.delete({
            where: {
                item_item_id_warehouse_warehouse_id: {
                    item_item_id: input.itemId,
                    warehouse_warehouse_id: input.warehouseId
                }
            }
        });
    }
}
