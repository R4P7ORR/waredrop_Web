import { PrismaService } from "../database/prisma.service";
export declare class CreateItemDto {
    itemName: string;
    itemQuantity: number;
    warehouseId: number;
}
export declare class UpdateItemDto {
    itemId: number;
    itemQuantity: number;
}
export declare class ItemsService {
    private readonly db;
    constructor(db: PrismaService);
    addItem(newItem: CreateItemDto): Promise<{
        Massage: string;
    }>;
    getItems(): Promise<{
        item_id: number;
        item_name: string;
        item_quantity: number;
        warehouse_id: number;
    }[]>;
    updateItem(updateInput: UpdateItemDto): Promise<{
        Massage: string;
    }>;
}
