interface WarehouseListItemProps {
    itemName: string;
    itemQuantity: string;
    handleChecked: () => void;
}

function WarehouseListItem(props: WarehouseListItemProps){
    return (
        <div className="item-container">
            <p className="item-name" title={props.itemName}>{props.itemName}</p>
            <p className="item-quantity" title={props.itemQuantity}>{props.itemQuantity}x</p>
            <label className="checkbox-container">
                <input type="checkbox" onChange={props.handleChecked}/>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}

export default WarehouseListItem;