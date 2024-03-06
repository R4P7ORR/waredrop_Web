interface LoginDisplayProps{
    emailInput: string;
    setEmailInput: (email: string) => void;

    passwordInput: string;
    setPasswordInput: (password: string) => void;

    sendLoginRequest: () => void;
}

function LoginDisplay(props: LoginDisplayProps) {
    return(
        <div>
            <input placeholder="Email" type="text" value={props.emailInput} onChange={(e) => {
                const email = e.target.value;
                props.setEmailInput(email);
            }}/>
            <input placeholder="Password" type="password" value={props.passwordInput} onChange={(e) => {
                const password = e.target.value;
                props.setPasswordInput(password);
            }}/>
            <button onClick={() => {
                props.sendLoginRequest()
            }}>Login</button>
        </div>
    )
}
export default LoginDisplay