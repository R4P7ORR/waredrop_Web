import ErrorPage from "../Components/ErrorPage";
import {useNavigate} from "react-router-dom";

function Notfound() {
    const navigate = useNavigate();
    const loginToken = localStorage.getItem("loginToken");
    return (
        <div className="app">
            <ErrorPage errorCode={404}/>
            <button className="ghost error-button text-light"
                    onClick={() => loginToken !== ""?navigate('/control'): navigate('/')}
            >Go Back</button>
        </div>
    )
}
export default Notfound;