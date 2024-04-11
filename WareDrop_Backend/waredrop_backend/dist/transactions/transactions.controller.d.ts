import { WorkerUpdateInput, Transaction, TransactionsService } from "./transactions.service";
import JwtDecoder from "../auth/jwt.decoder";
import { Request } from "express";
export declare class TransactionsController {
    private readonly service;
    private readonly jwt;
    constructor(service: TransactionsService, jwt: JwtDecoder);
    addTrans(newTrans: Transaction): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
    getAllTrans(): Promise<({
        items: {
            item_name: string;
            item_quantity: number;
        };
    } & {
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    })[]>;
    getAvailable(): Promise<({
        items: {
            item_name: string;
            item_quantity: number;
        };
    } & {
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    })[]>;
    getAllTransByWorker(req: Request): Promise<({
        items: {
            item_name: string;
            item_quantity: number;
        };
    } & {
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    })[]>;
    getTransDoneByWorker(req: Request): Promise<({
        items: {
            item_id: number;
            item_name: string;
            item_quantity: number;
            warehouse_id: number;
        };
    } & {
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    })[]>;
    updateTrans(updateInput: WorkerUpdateInput): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
    addWorker(token: Request, transId: WorkerUpdateInput): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
}
