import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import WarehouseDisplay from "../Displays/WarehouseDisplay";
import Navbar from "../Components/Navbar";
import Users from "../Components/Users/Users";
import Overlay from "../Components/Overlay";
import WarehouseContext from "../Contexts/WarehouseContextProvider";
import CheckForPermissions from "../Components/CheckForPermissions";
import Transaction from "../Components/Transactions/Transaction";

function Control(){
    const navigate = useNavigate();
    const [loginToken, setLoginToken] = useState("none");
    const [currentPage, setCurrentPage] = useState("warehouses");

    useEffect(() => {
        const token = localStorage.getItem("loginToken");
        if (token === null || token === "") {
            navigate("/unauthorized");
        }
        else {
            setLoginToken(token);
        }
    }, []);

    return (
        <WarehouseContext>
            <CheckForPermissions loginToken={loginToken} setCurrentPage={setCurrentPage}/>
            <Overlay loginToken={loginToken}/>
            <>
                <Navbar setCurrentPage={setCurrentPage}/>
            </>
            <div className="main-container">
                {currentPage === "warehouses" ?
                    <WarehouseDisplay loginToken={loginToken} setCurrentPage={setCurrentPage}/> : null
                }
                {currentPage === "transactions" ?
                    <Transaction loginToken={loginToken}/> : null
                }
                {currentPage === "users" ?
                    <Users loginToken={loginToken}/> : null
                }
                {currentPage === "contact" ?
                    <>contact</> : null
                }
            </div>
        </WarehouseContext>
    )
}

export default Control;
