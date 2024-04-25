import ErrorPage from "../Components/ErrorPage";
import {useNavigate} from "react-router-dom";

function Notfound() {
    const navigate = useNavigate();
    return (
        <div className="app">
            <ErrorPage errorCode={404}/>
            <button className="ghost error-button text-light" onClick={() => navigate('/control')}>Go Back</button>
        </div>
    )
}
export default Notfound;