import '../Styles/Navbar.css';
import {useContext, useEffect, useState} from "react";
import warehouseContext from "../Contexts/WarehouseContext";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
interface NavbarProps {
    setCurrentPage: (page: string) => void;
}

function Navbar({setCurrentPage}: NavbarProps){
    const navigate = useNavigate();
    const {isAdmin} = useContext(warehouseContext);
    const [timeLeft, setTimeLeft] = useState<number>(900000);
    const [timerTick, setTimerTick] = useState(60000);
    const logOutTime = Number.parseInt(localStorage.getItem("loginDate")!) + 1800000;

    useEffect(() => {
        setTimeLeft(logOutTime - Date.now());
        if (timeLeft < 120000){
            setTimerTick(1000);
        } else if(timeLeft < 600000 && timeLeft > 120000){
            setTimerTick(20000);
        }
        const timer = setInterval(() => {
            setTimeLeft(logOutTime - Date.now());
        }, timerTick);

        if (timeLeft < 120000 && timeLeft > 119000){
            swal("You will be automatically logged out in 3 minutes!", " ", "info", {
                buttons: {},
                timer: 4000,
            });
        }
        if (timeLeft < 11000 && timeLeft > 10000){
            swal("You will be automatically logged out in 10 seconds!", " ", "info", {
                buttons: {},
                timer: 4000,
            });
        }
        if (timeLeft < 10){
            navigate('/');
        }

        return () => {
            clearInterval(timer);
        }
    }, [timeLeft]);
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
                <div className="navbar-logout-timer">
                    <h1 className="text-dim-yellow text-spaced counter-timer">
                        {timeLeft > 180000?
                            Math.floor(timeLeft / 60000)
                            :
                            Math.round(timeLeft /1000)
                        }
                    </h1>
                    <p className="text-light">{timeLeft > 180000? "m" : "s"} until</p>
                </div>
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