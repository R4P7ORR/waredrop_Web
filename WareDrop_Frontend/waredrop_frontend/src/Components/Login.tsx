import {useState} from "react";
import axios from "axios";
import LoginDisplay from "../Displays/LoginDisplay";
import {useNavigate} from "react-router-dom";

function Login() {
    const [emailInput, setEmailInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const navigate = useNavigate();

    function sendLoginRequest() {
        if (!emailInput || !passwordInput){
            console.log("Must NOT be empty!")
        } else{
            axios.post(`http://localhost:3001/auth/login`, {
                email: emailInput,
                password: passwordInput,
            }).then(res => {
                if (res.data.hasOwnProperty("accessToken")) {
                    navigate('/Control');
                } else if (res.data.hasOwnProperty("errorMessage")) {
                    const errorMessage = res.data.errorMessage;
                    console.log(errorMessage)
                } else {
                    console.log("Unexpected response format");
                }
            });
        }
    }
    return (
        <LoginDisplay emailInput={emailInput} setEmailInput={setEmailInput} passwordInput={passwordInput} setPasswordInput={setPasswordInput} sendLoginRequest={() => sendLoginRequest()}/>
    )
}
export default Login;