import {useContext, useState} from "react";
import axios from "axios";
import WarehouseContext from "../Contexts/WarehouseContext";
import Item from "./Warehouse/Item";
import swal from "sweetalert";

function Overlay(){
    const [nameInput, setNameInput] = useState("");
    const [quantityInput, setQuantityInput] = useState<number>(1);
    const {
        selectedId,
        overlayType,setOverlayType,
        editingUser, setEditingUser,
        selectedItems,
    } = useContext(WarehouseContext);
    function handleAddWarehouse(){
        if (nameInput.trim().length === 0 || quantityInput === undefined){
            swal("Oops", "Name cannot be empty!", "error", {
                buttons: {},
                timer: 1500,
            });
        } else{
            let included = false;
            let updateItem: Item;
            selectedItems.forEach(item => {
                if (item.item_name === nameInput){
                    updateItem = item;
                    included = true;
                }
            });
            swal("Success!", `Added ${quantityInput}x ${nameInput} to the database!`, "success", {
                buttons: {},
                timer: 3000,
            });
            if(included){
                axios.patch("http://localhost:3001/items", {
                    itemId: updateItem!.item_id,
                    itemQuantity: updateItem!.item_quantity + quantityInput
                }).then(() => {
                    setNameInput("");
                    setQuantityInput(1);
                    setOverlayType("none");
                }).catch(() => {
                    swal("Oops!", `This was not supposed to happen :(`, "error", {
                        buttons: {},
                        timer: 2800,
                    });
                });
            } else {
                axios.post("http://localhost:3001/items", {
                    itemName: nameInput,
                    itemQuantity: quantityInput,
                    warehouseId: selectedId
                }).then(() => {
                    setNameInput("");
                    setQuantityInput(1);
                    setOverlayType("none");
                }).catch(() => {
                    swal("Oops!", `This was not supposed to happen :(`, "error", {
                        buttons: {},
                        timer: 2800,
                    });
                });
            }
        }
    }
    function handleEditWarehouse(){

    }
    function handleDeleteWarehouse(){

    }
    function handleEditUser(){

    }

    return(
        <>{overlayType !== "none" &&
            <div className="overlay-fullscreen">
                <div className="overlay-fullscreen-container">
                    {overlayType === "itemForm" &&
                        <>
                            <h1 className="text-light">New Item</h1>
                            <hr className="hr-left"/>
                            <input autoFocus={true} type="text" placeholder="Name" value={nameInput} maxLength={30} onChange={(e) => {
                                const name = e.target.value;
                                setNameInput(name);
                            }}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter")
                                       handleAddWarehouse();
                               }}/>
                            <input type="number" placeholder="Quantity" value={quantityInput} onChange={(e) => {
                                const quantity = e.target.value;
                                if (quantity.length >9) {
                                    return null;
                                }
                                if (quantity.length === 0 || Number.parseInt(quantity) < 1) {
                                    setQuantityInput(1);
                                } else {
                                    setQuantityInput(Number.parseInt(quantity));
                                }

                            }}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter")
                                       handleAddWarehouse();
                               }}/>
                            <button onClick={handleAddWarehouse}>Add</button>
                        </>
                    }
                    {overlayType === "warehouseForm" &&
                        <>
                            <h1 className="text-light">New Warehouse</h1>
                        </>
                    }
                    {overlayType === "warehouseEditForm" &&
                        <>
                            <h1 className="text-light">Edit this</h1>
                            <button onClick={handleEditWarehouse}>Confirm</button>
                        </>
                    }
                    {overlayType === "warehouseDeleteForm" &&
                        <>
                            <h1 className="text-light">Are you sure you want to delete</h1>
                            <button onClick={handleDeleteWarehouse}>Confirm</button>
                        </>
                    }
                    {overlayType === "userEditForm" &&
                        <>
                            <h1 className="text-light">Edit User Details</h1>
                            <input type="text" value={editingUser.user_name} onChange={(e) => {
                                const name = e.target.value;
                                setEditingUser({user_name: name, user_email: editingUser.user_email});
                            }}/>
                            <input type="text" value={editingUser.user_email} onChange={(e) => {
                                const email = e.target.value;
                                setEditingUser({user_name: editingUser.user_name, user_email: email});
                            }}/>
                            <button onClick={handleEditUser}>Confirm</button>
                        </>
                    }
                    <button onClick={() => {
                        setNameInput("");
                        setQuantityInput(1);
                        setOverlayType("none");
                    }}>Cancel</button>
                </div>
            </div>
        }</>
    )
}

export default Overlay;