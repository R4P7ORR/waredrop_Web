import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import WarehouseDisplay from "../Displays/WarehouseDisplay";
import Navbar from "../Components/Navbar";
import Users from "../Components/Users";
import Overlay from "../Components/Overlay";

function Control(){
    const navigate = useNavigate();
    const [loginToken, setLoginToken] = useState("none");
    const [currentPage, setCurrentPage] = useState("control");
    const [overlayType, setOverlayType] = useState("none");

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
        <div>
            {overlayType!== "none"&&
                <div className="overlay-fullscreen">
                    <Overlay getType={overlayType} setType={setOverlayType}/>
                </div>
            }
            <>
                <Navbar setCurrentPage={setCurrentPage}/>
            </>
            {currentPage === "control"?
                <WarehouseDisplay setType={setOverlayType} loginToken={loginToken}/> : null
            }
            {currentPage === "transactions"?
                <>transactions</> : null
            }
            {currentPage === "users"?
                <Users/> : null
            }
            {currentPage === "contact"?
                <>contact</> : null
            }
        </div>
    )
}
export default Control;
