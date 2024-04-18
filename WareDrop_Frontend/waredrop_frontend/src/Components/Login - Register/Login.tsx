import {useState} from "react";
import axios from "axios";
import LoginDisplay from "../../Displays/LoginDisplay";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";

function Login() {
    const [emailInput, setEmailInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const navigate = useNavigate();
    localStorage.setItem("loginToken", "");

    function sendLoginRequest() {
        if (!emailInput){
            swal("Email cannot be empty!"," ", "error", {
                buttons: {},
                timer: 1500,
            });
        } else if(!passwordInput){
            swal("Password cannot be empty!"," ", "error", {
                buttons: {},
                timer: 1500,
            });
        }else{
            axios.post(`http://localhost:3001/auth/login`, {
                email: emailInput,
                password: passwordInput,
            }).then(res => {
                if (res.data.hasOwnProperty("accessToken")) {
                    localStorage.setItem("loginToken", res.data.accessToken);
                    localStorage.setItem("loginDate", Date.now().toString());
                    console.log(Date.now().toString())
                    navigate('/Control');
                } else {
                    swal("Oops", "Something went wrong!", "error", {
                        buttons: {},
                        timer: 1500,
                    });
                    console.log("Unexpected response format");
                }
            }).catch(() => {
                swal("Email or password is incorrect!"," " , "error", {
                    buttons: {},
                    timer: 1500,
                });
            });
        }
    }
    return (
        <LoginDisplay emailInput={emailInput} setEmailInput={setEmailInput} passwordInput={passwordInput} setPasswordInput={setPasswordInput} sendLoginRequest={() => sendLoginRequest()}/>
    )
}
export default Login;