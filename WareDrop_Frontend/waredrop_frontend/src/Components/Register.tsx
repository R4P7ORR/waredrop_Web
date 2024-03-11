import {useState} from "react";
import {useNavigate} from "react-router-dom";
import RegisterDisplay from "../Displays/RegisterDisplay";
import axios from "axios";

interface RegisterProps{
    handleRegister: (className: string) => void;
}
function Register(props: RegisterProps) {
    const [fullNameInput, setFullNameInput] = useState<string>('');
    const [emailInput, setEmailInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const navigate = useNavigate();

    function sendRegisterRequest() {
        if (!fullNameInput || !emailInput || !passwordInput){
            console.log("Must NOT be empty!")
        } else{
            axios.post('http://localhost:3001/auth/register', {
                name: fullNameInput,
                email: emailInput,
                password: passwordInput
            }).then(res => {
                if (res.data.hasOwnProperty('message')){
                    setFullNameInput('');
                    setEmailInput('');
                    setPasswordInput('');
                    props.handleRegister('container');
                } else if(res.data.hasOwnProperty('errorMessage')){
                    console.log(res.data.errorMessage);
                } else {
                    console.log("Unexpected response format");
                }
            });
        }
    }
    return (
        <RegisterDisplay fullNameInput={fullNameInput} setFullNameInput={setFullNameInput} emailInput={emailInput} setEmailInput={setEmailInput} passwordInput={passwordInput} setPasswordInput={setPasswordInput} sendRegisterRequest={() => sendRegisterRequest()}/>
    )
}
export default Register;