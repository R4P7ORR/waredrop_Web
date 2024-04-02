import { CreateItemDto, ItemsService } from "./items.service";
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
    }[]>;
}
