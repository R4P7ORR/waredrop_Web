interface WarehouseListItemProps {
    itemName: string;
    handleChecked: () => void;
}

function WarehouseListItem(props: WarehouseListItemProps){
    return (
        <div className="item-container">
            <p className="item-name">{props.itemName}</p>
            <label className="checkbox-container">
                <input type="checkbox" onChange={props.handleChecked}/>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}

export default WarehouseListItem;