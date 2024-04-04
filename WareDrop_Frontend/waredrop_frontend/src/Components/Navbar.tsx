import '../Styles/Navbar.css';
import {useContext} from "react";
import warehouseContext from "../Contexts/WarehouseContext";
interface NavbarProps {
    setCurrentPage: (page: string) => void;
}

function Navbar({setCurrentPage}: NavbarProps){
    const {isAdmin} = useContext(warehouseContext);
    const handlePageChange = (newPage: string) => {
        document.getElementById("menu-toggle")!.click();
        setCurrentPage(newPage);
    };

    return (
        <nav>
            <div className="hamburger-menu">
                <input id="menu-toggle" type="checkbox"/>
                <label className="menu-btn" htmlFor="menu-toggle">
                    <span/>
                </label>
                <ul className="menu-box">
                    <button onClick={() => handlePageChange("control")} className="menu-item">Warehouses</button>
                    <button onClick={() => handlePageChange("transactions")} className="menu-item">Transactions</button>
                    {isAdmin&&
                        <button onClick={() => handlePageChange("users")} className="menu-item">Users</button>
                    }
                    <button onClick={() => handlePageChange("contact")} className="menu-item">Contact Us</button>
                </ul>
                <div className="lower-box"/>
            </div>
        </nav>
    )
}

export default Navbar;