import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

interface ControlProps{
    loginToken: number | undefined;
}
function Control(props: ControlProps){
    const navigate = useNavigate();
    useEffect(() => {
        if (props.loginToken === undefined) {
            navigate("/unauthorized");
        }
    }, [props.loginToken, navigate]);
    console.log(props.loginToken)

    return (
        <div className="app">
        </div>
    )
}
export default Control;