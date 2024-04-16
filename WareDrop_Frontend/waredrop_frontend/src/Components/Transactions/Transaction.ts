export default class Transaction {
    constructor(public item_item_id: number, public trans_arrived_date: string | null, public trans_id: number,
                trans_origin_id: number, public trans_post_date: string, public trans_target_id: number,
                public worker_email: string | null) {}
}