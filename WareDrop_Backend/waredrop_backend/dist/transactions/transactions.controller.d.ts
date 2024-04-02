import { WorkerUpdateInput, Transaction, TransactionsService } from "./transactions.service";
import JwtDecoder from "../auth/jwt.decoder";
import { Request } from "express";
export declare class TransactionsController {
    private readonly service;
    private readonly jwt;
    constructor(service: TransactionsService, jwt: JwtDecoder);
    addTrans(newTrans: Transaction): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }>;
    addWorker(addInput: WorkerUpdateInput): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }>;
    getAllTrans(): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }[]>;
    getAvailable(): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }[]>;
    getAllTransByUser(req: Request): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }[]>;
    getAllTransByWorker(req: Request): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }[]>;
    updateTrans(input: WorkerUpdateInput): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }>;
}
