import ErrorPage from "../Components/ErrorPage";
import {useNavigate} from "react-router-dom";

function Unauthorized(){
    const navigate = useNavigate();
    return (
        <div className="app">
            <ErrorPage errorCode={401}/>
            <button className="ghost error-button text-light" onClick={() => navigate('/')}>Back Home</button>
        </div>
    )
}

export default Unauthorized;