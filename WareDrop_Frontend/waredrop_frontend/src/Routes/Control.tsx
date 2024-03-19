import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import WarehouseDisplay from "../Displays/WarehouseDisplay";
import Navbar from "../Components/Navbar";

function Control(){
    const navigate = useNavigate();
    const [loginToken, setLoginToken] = useState("none");
    useEffect(() => {
        const token = localStorage.getItem("loginToken");
        if (token === null || token === "") {
            navigate("/unauthorized");
        }
        else {
            setLoginToken(token);
        }
    });
    return (
        <div>
            <>
                <Navbar/>
            </>
            <>
                <WarehouseDisplay loginToken={loginToken}/>
            </>
        </div>
    )
}
export default Control;