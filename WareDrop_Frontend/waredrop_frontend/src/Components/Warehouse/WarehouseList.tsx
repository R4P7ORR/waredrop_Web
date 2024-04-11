import React, {useContext, useEffect, useState} from "react";
import WarehouseListItem from "./WarehouseListItem";
import Item from "./Item";
import axios from "axios";
import WarehouseContext from "../../Contexts/WarehouseContext";
import editImage from "../../../public/images/edit_button.png";
import deleteImage from "../../../public/images/delete_button.png";
import swal from "sweetalert";

interface WarehouseListProps {
    warehouse_id: number;
    warehouse_name: string;
    location: string;
}

function WarehouseList({warehouse_id, warehouse_name, location}: WarehouseListProps){
    const [itemList, setItemList] = useState<Item[]>([]);
    const {setSelectedId, overlayType, setOverlayType, editingWarehouse, deletingWarehouse,selectedItems, setSelectedItems} = useContext(WarehouseContext);

    useEffect(() => {
        if (warehouse_id !== null){
            axios.get('http://localhost:3001/warehouses/items/' + warehouse_id, {
            }).then(res => {
                setItemList(res.data);
            });
        }}, [overlayType]);

    const handleCheckBox = (item: Item) => {
        let updatedItems = [...selectedItems];
        const itemIndex = updatedItems.findIndex((selectedItem) => selectedItem.item_id === item.item_id);
        if (itemIndex === -1) {
            updatedItems.push(item);
        } else {
            updatedItems.splice(itemIndex, 1);
        }
        setSelectedItems(updatedItems);
        console.log(updatedItems)
        if (updatedItems.length === 0){
            setOverlayType("none");
            (document.getElementById(warehouse_id.toString()))!.style.zIndex = "";
        } else {
            setOverlayType("empty");
            (document.getElementById(warehouse_id.toString()))!.style.zIndex = "170";
        }
    }

    return (
        <div className="container-warehouse container-box" id={warehouse_id.toString()}>
            <div className="container-header">
                <h2>{warehouse_name.toUpperCase()}</h2>
                <div className="align-horizontal">
                    <h4 className="text-dim-yellow">{location}</h4>
                    {(editingWarehouse && overlayType !== "empty") &&
                        <button className="button-modify" onClick={() => {
                            setOverlayType("warehouseEditForm");
                            setSelectedId(warehouse_id);
                        }}>
                            <img className="button-image" src="/images/edit_button.png" alt="Edit"/>
                        </button>
                    }
                    {(deletingWarehouse && overlayType !== "empty") &&
                        <button className="button-modify button-delete" onClick={() => {
                            if (itemList.length !== 0){
                                swal("Oh-oh!", "You cannot delete a warehouse that contains items!", "error", {
                                    buttons: {},
                                    timer: 2500
                                });
                            } else {
                                setOverlayType("warehouseDeleteForm");
                                setSelectedId(warehouse_id);
                            }
                        }}>
                            <img className="button-image" src="/images/delete_button.png" alt="Delete"/>
                        </button>
                    }
                </div>
                {overlayType !== "empty"&&
                <button onClick={() => {
                    setOverlayType("itemForm");
                    setSelectedId(warehouse_id);
                }}>Add item
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