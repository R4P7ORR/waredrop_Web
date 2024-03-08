import {Link, Outlet} from "react-router-dom";

interface HomeDisplayProps{

}

function HomeDisplay(props: HomeDisplayProps) {
    return(
        <div className="homeDiv">
            <div className="buttonContainer">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Outlet/>
            </div>
        </div>
    )
}
export default HomeDisplay