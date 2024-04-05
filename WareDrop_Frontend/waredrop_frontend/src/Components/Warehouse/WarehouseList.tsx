import {useContext, useEffect, useState} from "react";
import WarehouseListItem from "./WarehouseListItem";
import Item from "./Item";
import axios from "axios";
import WarehouseContext from "../../Contexts/WarehouseContext";

interface WarehouseListProps {
    warehouse_id: number;
    warehouse_name: string;
    location: string;
}

function WarehouseList({warehouse_id, warehouse_name, location}: WarehouseListProps){
    const [itemList, setItemList] = useState<Item[]>([]);
    const {setSelectedId, overlayType, setOverlayType, editingWarehouse, deletingWarehouse, setSelectedItems} = useContext(WarehouseContext);

    useEffect(() => {
        if (warehouse_id !== null){
            axios.get('http://localhost:3001/warehouses/items/' + warehouse_id, {
            }).then(res => {
                setItemList(res.data);
            });
        }}, [overlayType]);

    function handleCheckBox(item: Item){

    }

    return (
        <div className="container-warehouse">
            <div className="container-header">
                <h1>{warehouse_name}</h1>
                <h4>{location}</h4>
                <button onClick={() => {
                    setOverlayType("itemForm");
                    setSelectedId(warehouse_id);
                    setSelectedItems(itemList);
                }}>Add item
                </button>
                {editingWarehouse&&
                    <button onClick={() => {
                        setOverlayType("warehouseEditForm");
                        setSelectedId(warehouse_id);
                    }}>
                        Pencil thingy goes here
                    </button>
                }
                {deletingWarehouse&&
                    <button onClick={() => {
                        setOverlayType("warehouseDeleteForm");
                        setSelectedId(warehouse_id);
                    }}>
                        Trash thingy goes here
                    </button>
                }
            </div>
            <div className="container-body">
                {itemList.length === 0 ?
                    <p>No items in warehouse</p>
                    :
                    <>
                    {itemList.map((item) => (
                        <WarehouseListItem key={item.item_id} itemName={item.item_name} itemQuantity={item.item_quantity} handleChecked={() => handleCheckBox(item)}/>
                    ))}
                    </>
                }
            </div>
        </div>
    )
}
export default WarehouseList;