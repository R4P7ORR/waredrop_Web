import {useContext, useEffect, useState} from "react";
import WarehouseListItem from "./WarehouseListItem";
import Item from "./Item";
import axios from "axios";
import WarehouseContext from "../../Contexts/WarehouseContext";

interface WarehouseListProps {
    warehouse_id: number;
    warehouse_name: string;
    location: string;
    setType: (type: string) => void;
}

function WarehouseList({setType, warehouse_id, warehouse_name, location}: WarehouseListProps){
    const [itemList, setItemList] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const {setSelectedId} = useContext(WarehouseContext);

    useEffect(() => {
        if (warehouse_id !== null){
            axios.get('http://localhost:3001/warehouses/items/' + warehouse_id, {
            }).then(res => {
                setItemList(res.data);
                console.log(itemList)
            });
        }}, [warehouse_id]);

    function handleCheckBox(item: Item){
        if (selectedItems.filter(selected => selected.item_name === item.item_name).length === 0){
            selectedItems.push(item);
        }else {
            setSelectedItems(selectedItems.filter(items => items !== item));
        }
        console.log(selectedItems)
    }

    return (
        <div className="warehouse-container">
            <div className="container-header">
                <h1>{warehouse_name}</h1>
                <h3>id: {warehouse_id}</h3>
                <button onClick={() => {
                    setType("itemForm");
                    setSelectedId(warehouse_id);
                }}>Add item</button>
            </div>
            <div className="container-body">
                {itemList.length === 0?
                    <p>No items in warehouse</p>
                    :
                    <>
                    {itemList.map((item) => (
                        <WarehouseListItem key={item.item_id} itemName={item.item_name} handleChecked={() => handleCheckBox(item)}/>
                    ))}
                    </>
                }
            </div>
        </div>
    )
}
export default WarehouseList;