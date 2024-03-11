interface RegisterDisplayProps{
    fullNameInput: string;
    setFullNameInput: (fullName: string) => void;

    emailInput: string;
    setEmailInput: (email: string) => void;

    passwordInput: string;
    setPasswordInput: (password: string) => void;

    sendRegisterRequest: () => void;
}

function RegisterDisplay(props: RegisterDisplayProps) {
    return(
        <div className="form-block">
            <h1>Register</h1>
            <input placeholder="Email" type="email" value={props.emailInput} onChange={(e) => {
                const email = e.target.value;
                props.setEmailInput(email);
            }}/>
            <hr/>
            <input placeholder="Full Name" type="text" value={props.fullNameInput} onChange={(e) => {
                const fullName = e.target.value;
                props.setFullNameInput(fullName);
            }}/>
            <hr/>
            <input placeholder="Password" type="password" value={props.passwordInput} onChange={(e) => {
                const password = e.target.value;
                props.setPasswordInput(password);
            }}/>
            <hr/>
            <button onClick={() => {
                props.sendRegisterRequest()
            }}>Register
            </button>
        </div>
    )
}

export default RegisterDisplay