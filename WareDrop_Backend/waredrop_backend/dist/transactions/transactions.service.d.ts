import { PrismaService } from "../database/prisma.service";
import { UserDto } from "../users/users.service";
export declare class Transaction {
    transId?: number;
    transArrivedDate?: string;
    transOriginId: number;
    transTargetId: number;
    itemId: number;
    workerEmail?: string;
}
export declare class WorkerUpdateInput {
    transId: number;
}
export declare class TransactionsService {
    private readonly db;
    constructor(db: PrismaService);
    createTrans(newTrans: Transaction): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
    getAllTransByWorker(user: UserDto): Promise<({
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
    getAvailableTrans(): Promise<({
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
    getTransDone(input: UserDto): Promise<({
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
    addWorkerToTrans(addInput: WorkerUpdateInput, workerEmail: string): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
    updateTrans(updateInput: WorkerUpdateInput): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin_id: number;
        trans_target_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
}
