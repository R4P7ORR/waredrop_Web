interface TransDTO{
    trans_id:number
    "trans_post_date": Date,
    "trans_arrived_date": null|Date,
    "trans_origin_id": number,
    "trans_target_id": number,
    "item_item_id": number,
    "worker_email": null|string,
    items: {
        "item_name": string
        "item_quantity": number
    }
}

export default TransDTO