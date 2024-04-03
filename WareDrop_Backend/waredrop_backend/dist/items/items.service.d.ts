import { PrismaService } from "../database/prisma.service";
export declare class CreateItemDto {
    itemName: string;
    itemQuantity: number;
    warehouseId: number;
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
    }[]>;
    assignItemToWarehouse(itemId: number, warehouseId: number): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
}
