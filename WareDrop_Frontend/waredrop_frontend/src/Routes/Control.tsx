import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Control(){
    const loginToken: string | null = 'JSON.parse(localStorage.getItem())';
    const navigate = useNavigate();
    useEffect(() => {
        if (loginToken === undefined) {
            navigate("/unauthorized");
        }
    }, [loginToken, navigate]);
    console.log(loginToken)

    return (
        <div className="app">
        </div>
    )
}
export default Control;