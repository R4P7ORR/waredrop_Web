import {useState} from "react";
import WarehouseListItem from "./WarehouseListItem";
import Item from "./Item";

interface WarehouseListProps {
    warehouse_id: number;
    warehouse_name: string;
    location: string;
    setType: (type: string) => void;
}

function WarehouseList({setType}: WarehouseListProps, props: WarehouseListProps){
    const [itemList, setItemList] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<Item[]>([])
    function handleCheckBox(item: Item){
        if (selectedItems.filter(selected => selected.name === item.name).length === 0){
            selectedItems.push(item);
        }else {
            setSelectedItems(selectedItems.filter(items => items !== item));
        }
        console.log(selectedItems)
    }

    function addItem(){
        setType("itemForm");
    }

    return (
        <div className="warehouse-container">
            <div className="container-header">
                <h1>{props.warehouse_name}</h1>
                <h3>id: {props.warehouse_id}</h3>
                <button onClick={addItem}>Add item</button>
            </div>
            <div className="container-body">
                {itemList.length === 0?
                    <p>No items in warehouse</p>
                    :
                    <>
                    {itemList.map((item) => (
                        <WarehouseListItem key={item.id} itemName={item.name} handleChecked={() =>handleCheckBox(item)}/>
                    ))}
                    </>
                }
            </div>
        </div>
    )
}
export default WarehouseList;