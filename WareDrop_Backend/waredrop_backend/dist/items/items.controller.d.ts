import { CreateItemDto, ItemsService, UpdateItemDto } from "./items.service";
export declare class ItemsController {
    private readonly service;
    constructor(service: ItemsService);
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
