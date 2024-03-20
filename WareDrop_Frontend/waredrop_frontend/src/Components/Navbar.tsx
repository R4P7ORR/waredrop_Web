import '../Styles/Navbar.css';
function Navbar(){
    return (
        <nav>
            <div className="hamburger-menu">
                <input id="menu-toggle" type="checkbox"/>
                <label className="menu-btn" htmlFor="menu-toggle">
                    <span/>
                </label>
                <ul className="menu-box">
                    <button className="menu-item">Warehouses</button>
                    <button className="menu-item">Transactions</button>
                    <button className="menu-item">Users</button>
                    <button className="menu-item">Contact Us</button>
                </ul>
                <div className="lower-box"/>
            </div>
        </nav>
    )
}

export default Navbar;