import '../Styles/Control.css';
import WarehouseListItem from "../Components/WarehouseListItem";
import axios from "axios";
interface WarehouseDisplayProps{
    loginToken: string;
}
function WarehouseDisplay(props: WarehouseDisplayProps) {
    let itemList: string[] = [];
    if (props.loginToken !== "none"){
        axios.get('http://localhost:3001/warehouses', {
            headers: {authorization: "bearer " + props.loginToken}
        }).then(res => {
            console.log(res)
        });
    }

    function handleCheckBox(itemName: string){
        if (itemList.filter(items => items === itemName).length === 0){
            itemList.push(itemName);
        }else {
            itemList = itemList.filter(items => items !== itemName)
        }
    }
    return (
        <div>
            <WarehouseListItem itemName={"Item1"} handleChecked={() => handleCheckBox("Item1")}/>
            <WarehouseListItem itemName={"Item2"} handleChecked={() => handleCheckBox("Item2")}/>
            <WarehouseListItem itemName={"Item3"} handleChecked={() => handleCheckBox("Item3")}/>
            <WarehouseListItem itemName={"Item4"} handleChecked={() => handleCheckBox("Item4")}/>
        </div>
    )
}

export default WarehouseDisplay;