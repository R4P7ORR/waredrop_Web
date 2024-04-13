import {useContext, useEffect, useState} from "react";
import WarehouseContext from "../../Contexts/WarehouseContext";

interface WarehouseListItemProps {
    itemName: string;
    itemQuantity: string;
    handleChecked: () => void;
}


function WarehouseListItem(props: WarehouseListItemProps){
    const [checked, setChecked] = useState(false);
    const {flushValues} = useContext(WarehouseContext);

    useEffect(() => {
        setChecked(false);
    }, [flushValues]);
    return (
        <div className="item-container">
            <p className="item-name" title={props.itemName}>{props.itemName}</p>
            <p className="item-quantity" title={props.itemQuantity}>{props.itemQuantity}x</p>
            <label className="checkbox-container">
                <input type="checkbox" checked={checked} onClick={() => setChecked(!checked)} onChange={props.handleChecked}/>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}

export default WarehouseListItem;