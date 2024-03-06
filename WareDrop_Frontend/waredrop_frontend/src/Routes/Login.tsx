import {useState} from "react";
import axios from "axios";
import LoginDisplay from "../Displays/LoginDisplay";
import {createBrowserRouter, useNavigate} from "react-router-dom";
import Control from "./Control";

interface LoginProps{
    setLoginToken: (id: number) => void;
}

function Login(props: LoginProps) {
    const [emailInput, setEmailInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const navigate = useNavigate();

    function sendLoginRequest() {
        axios.post(`http://localhost:3001/user/login`, {
            user_email: emailInput,
            user_password: passwordInput,
        })
            .then(res => {
                if (res.data.hasOwnProperty("user_id")) {
                    props.setLoginToken(res.data.user_id);
                    navigate('/Control');
                } else if (res.data.hasOwnProperty("errorMessage")) {
                    const errorMessage = res.data.errorMessage;
                    console.log(errorMessage)
                } else {
                    console.log("Unexpected response format");
                }
            })
    }
    return (
        <div className="app">
            <LoginDisplay emailInput={emailInput} setEmailInput={setEmailInput} passwordInput={passwordInput} setPasswordInput={setPasswordInput} sendLoginRequest={() => sendLoginRequest()}/>
        </div>
    )
}
export default Login;