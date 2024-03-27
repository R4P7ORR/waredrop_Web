interface WarehouseListItemProps {
    itemName: string;
    handleChecked: () => void;
}

function WarehouseListItem(props: WarehouseListItemProps){
    return (
        <div className="item-container">
            <p className="item-name">{props.itemName}</p>
            <input type="checkbox" onChange={props.handleChecked}/>
        </div>
    )
}
export default WarehouseListItem;