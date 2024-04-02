import {useState} from "react";
import axios from "axios";

interface OverlayProps {
    id?: number;
    getType: string;
    setType: (type: string) => void;
}
function Overlay({id, getType, setType}: OverlayProps){
    const [nameInput, setNameInput] = useState("");
    const [quantityInput, setQuantityInput] = useState<string>();

    function handleClick(){
        if (nameInput.trim().length === 0 || quantityInput === undefined){
            console.log("Cannot be empty");
        } else{
            console.log(quantityInput, id)
            axios.post("http://localhost:3001/items/new", {
                itemName: nameInput,
                itemQuantity: quantityInput,
                warehouseId: id
            }).then(res =>{
                console.log(res);
                setType("none");
            })
        }
    }

    return(
        <div className="overlay-fullscreen-container">
            {getType === "itemForm" &&
                <>
                    <h1 className="text-light">New Item</h1>
                    <hr className="hr-left"/>
                    <input type="text" placeholder="Name" value={nameInput} onChange={(e) => {
                        const name = e.target.value;
                        setNameInput(name);
                    }}/>
                    <input type="number" placeholder="Quantity" value={quantityInput} onChange={(e) => {
                        const quantity = e.target.value;
                        setQuantityInput(quantity);
                    }}/>
                    <button onClick={handleClick}>Add</button>
                </>
            }
            {getType === "warehouseForm" &&
                <>
                    <h1 className="text-light">New Warehouse</h1>
                </>
            }
            <button onClick={() => setType("none")}>Cancel</button>
        </div>
    )
}

export default Overlay;