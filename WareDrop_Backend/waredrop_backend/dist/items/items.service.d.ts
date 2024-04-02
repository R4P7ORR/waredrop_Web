import { PrismaService } from "../database/prisma.service";
export interface Item {
    item_id?: number;
    item_name: string;
    item_quantity: number;
}
export declare class ItemsService {
    private readonly db;
    constructor(db: PrismaService);
    addItem(newItem: Item): Promise<{
        item_id: number;
        item_name: string;
        item_quantity: number;
    }>;
    getItems(): Promise<{
        item_id: number;
        item_name: string;
        item_quantity: number;
    }[]>;
    assignItemToWarehouse(item_id: number, warehouse_name: string): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }>;
    deleteItem(item_id: number): Promise<{
        item_id: number;
        item_name: string;
        item_quantity: number;
    }>;
}
