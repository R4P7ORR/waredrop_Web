import {useContext, useState} from "react";
import axios from "axios";
import WarehouseContext from "../Contexts/WarehouseContext";

function Overlay(){
    const [nameInput, setNameInput] = useState("");
    const [quantityInput, setQuantityInput] = useState<number>(1);
    const {selectedId, overlayType, setOverlayType} = useContext(WarehouseContext);
    function handleAdd(){
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
    function handleEdit(){

    }
    function handleDelete(){

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
                            <button onClick={handleAdd}>Add</button>
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
                            <button onClick={handleEdit}>Confirm</button>
                        </>
                    }
                    {overlayType === "warehouseDeleteForm" &&
                        <>
                            <h1 className="text-light">Are you sure you want to delete</h1>
                            <button onClick={handleDelete}>Confirm</button>
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