import Item from "../Warehouse/Item";

export default class Transaction {
    constructor(public items: Item, public trans_arrived_date: string | null, public trans_id: number,
                public trans_origin_id: number, public trans_post_date: string, public trans_target_id: number,
                public worker_email: string | null) {}
}