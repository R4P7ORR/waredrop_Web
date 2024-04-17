import '../Styles/Navbar.css';
import {useContext, useState} from "react";
import warehouseContext from "../Contexts/WarehouseContext";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
interface NavbarProps {
    setCurrentPage: (page: string) => void;
}

function Navbar({setCurrentPage}: NavbarProps){
    const navigate = useNavigate();
    const {isAdmin} = useContext(warehouseContext);

    const handlePageChange = (newPage: string) => {
        document.getElementById("menu-toggle")!.click();
        setCurrentPage(newPage);
    };

    function handleLogout() {
        swal({
            title: "Are you sure?",
            text: `You will be automatically signed out in 5 seconds.`,
            icon: "warning",
            buttons: { "confirm": {text: "Cancel", } },
            timer: 5000,
            dangerMode: true,
            closeOnClickOutside: false,
            closeOnEsc: false
        }).then((cancel) => {
                if (!cancel) {
                    navigate('/');
                    localStorage.setItem("loginToken", "");
                }
            });
    }

    return (
        <nav>
            <div className="hamburger-menu">
                <button className="button-logout" onClick={handleLogout}>Logout</button>
                <input id="menu-toggle" type="checkbox"/>
                <label className="menu-btn" htmlFor="menu-toggle">
                    <span/>
                </label>
                <ul className="menu-box">
                    {isAdmin &&
                        <button onClick={() => handlePageChange("users")} className="menu-item">Users</button>
                    }
                    <button onClick={() => handlePageChange("warehouses")} className="menu-item">Warehouses</button>
                    <button onClick={() => handlePageChange("transactions")} className="menu-item">Transactions</button>
                    <button onClick={() => handlePageChange("contact")} className="menu-item">Contact Us</button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;