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
                    <input type="button" value="Warehouses"/>
                    <input type="button" value="Transactions"/>
                    <input type="button" value="Users"/>
                    <input type="button" value="Contact Us"/>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;