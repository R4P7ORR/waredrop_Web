interface RegisterDisplayProps{
    fullNameInput: string;
    setFullNameInput: (fullName: string) => void;

    emailInput: string;
    setEmailInput: (email: string) => void;

    passwordInput: string;
    setPasswordInput: (password: string) => void;

    passwordAgainInput: string;
    setPasswordAgainInput: (password: string) => void;

    sendRegisterRequest: () => void;
}

function RegisterDisplay(props: RegisterDisplayProps) {
    return(
        <div className="form-block">
            <h1>Register</h1>
            <input placeholder="Email" type="text" value={props.emailInput} onChange={(e) => {
                const email = e.target.value;
                if (email.includes(' ')) {
                    return
                }
                props.setEmailInput(email);
            }} onKeyDown={(e) => {
                if (e.key === "Enter")
                    props.sendRegisterRequest();
            }}/>
            <hr/>
            <input placeholder="Full Name" type="text" value={props.fullNameInput} onChange={(e) => {
                const fullName = e.target.value;
                props.setFullNameInput(fullName);
            }} onKeyDown={(e) => {
                if (e.key === "Enter")
                    props.sendRegisterRequest();
            }}/>
            <hr/>
            <input placeholder="Password" type="password" value={props.passwordInput} onChange={(e) => {
                const password = e.target.value;
                if (password.includes(' ')) {
                    return
                }
                props.setPasswordInput(password);
            }} onKeyDown={(e) => {
                if (e.key === "Enter")
                    props.sendRegisterRequest();
            }}/>
            <hr/>
            <input placeholder="Password Again" type="password" value={props.passwordAgainInput} onChange={(e) => {
                const password = e.target.value;
                if (password.includes(' ')) {
                    return
                }
                props.setPasswordAgainInput(password);
            }} onKeyDown={(e) => {
                if (e.key === "Enter")
                    props.sendRegisterRequest();
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