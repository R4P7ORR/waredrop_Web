import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import WarehouseDisplay from "../Displays/WarehouseDisplay";
import Navbar from "../Components/Navbar";
import Users from "../Components/Users/Users";
import Overlay from "../Components/Overlay";
import WarehouseContext from "../Contexts/WarehouseContextProvider";

function Control(){
    const navigate = useNavigate();
    const [loginToken, setLoginToken] = useState("none");
    const [currentPage, setCurrentPage] = useState("control");

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
            <Overlay loginToken={loginToken}/>
            <>
                <Navbar setCurrentPage={setCurrentPage}/>
            </>
            <div className="main-container">
                {currentPage === "control" ?
                    <WarehouseDisplay loginToken={loginToken}/> : null
                }
                {currentPage === "transactions" ?
                    <>transactions</> : null
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
