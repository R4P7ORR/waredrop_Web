import { Item, ItemsService } from "./items.service";
import JwtDecoder from "../auth/jwt.decoder";
export declare class ItemsController {
    private readonly service;
    private readonly jwt;
    constructor(service: ItemsService, jwt: JwtDecoder);
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
    assignItemToWarehouse({ user_id, warehouse_name }: {
        user_id: number;
        warehouse_name: string;
    }): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }>;
    delete(item_id: number): Promise<{
        item_id: number;
        item_name: string;
        item_quantity: number;
    }>;
}
