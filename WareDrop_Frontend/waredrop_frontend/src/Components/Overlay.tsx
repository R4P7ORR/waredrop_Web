import {useContext, useState} from "react";
import axios from "axios";
import WarehouseContext from "../Contexts/WarehouseContext";

function Overlay(){
    const [nameInput, setNameInput] = useState("");
    const [quantityInput, setQuantityInput] = useState<number>(1);
    const {selectedId, overlayType, setOverlayType, editingUser, setEditingUser} = useContext(WarehouseContext);
    function handleAddWarehouse(){
        if (nameInput.trim().length === 0 || quantityInput === undefined){
            console.log("Cannot be empty");
        } else{
            console.log(quantityInput, selectedId)
            axios.post("http://localhost:3001/items", {
                itemName: nameInput,
                itemQuantity: quantityInput,
                warehouseId: selectedId
            }).then(res =>{
                setNameInput("");
                setQuantityInput(1);
                setOverlayType("none");
            })
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
                            <input type="text" placeholder="Name" value={nameInput} onChange={(e) => {
                                const name = e.target.value;
                                setNameInput(name);
                            }}/>
                            <input type="number" placeholder="Quantity" value={quantityInput} onChange={(e) => {
                                const quantity = e.target.value;
                                if (quantity.length === 0 || Number.parseInt(quantity) < 1) {
                                    setQuantityInput(1);
                                } else {
                                    setQuantityInput(Number.parseInt(quantity));
                                }
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